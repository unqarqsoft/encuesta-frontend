import { DataSource as NGDataSource} from '@angular/cdk/collections';
import { MdPaginator, MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

export class DataSource<T> extends NGDataSource<T> {
  dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  filterChange: BehaviorSubject<string> = new BehaviorSubject('');
  itemValue: (item: T, sort?: string) => string = () => {return ''};
  filteredData: T[] = [];
  renderedData: T[] = [];

  get filter(): string { return this.filterChange.value; }
  set filter(filter: string) { this.filterChange.next(filter); }

  constructor(public data: T[], private paginator: MdPaginator, private sort?: MdSort) {
    super();
    this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
    this.dataChange.next(data);
  }

  connect(): Observable<T[]> {
    let displayDataChanges: any[] = [];

    displayDataChanges = [
      this.dataChange,
      this.filterChange,
      this.paginator.page
    ];

    if (typeof this.sort !== 'undefined') {
      displayDataChanges.push(this.sort._matSortChange);
    }

    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this.data.slice().filter((item) => {
        let searchStr = this.itemValue(item).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      const sortedData = this.sortData(this.filteredData.slice());

      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this.paginator.pageSize);

      return this.renderedData;
    });
  }

  disconnect() {}

  sortData(data: T[]): T[] {
    if (!this.sort || !this.sort.active || this.sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      [propertyA, propertyB] = [this.itemValue(a, this.sort.active), this.itemValue(b, this.sort.active)];

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1);
    });
  }
}
