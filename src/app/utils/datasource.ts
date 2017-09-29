import { DataSource as NGDataSource} from '@angular/cdk/collections';
import { MdPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

export class DataSource<T> extends NGDataSource<T> {
  dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  filterChange: BehaviorSubject<string> = new BehaviorSubject('');
  itemValue: (item: T) => string = () => {return ''};
  filteredData: T[] = [];
  renderedData: T[] = [];

  get filter(): string { return this.filterChange.value; }
  set filter(filter: string) { this.filterChange.next(filter); }

  constructor(public data: T[], private paginator: MdPaginator) {
    super();
    this.dataChange.next(data);
  }

  connect(): Observable<T[]> {
    const displayDataChanges = [
      this.dataChange,
      this.filterChange,
      this.paginator.page
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this.data.slice().filter((item) => {
        let searchStr = this.itemValue(item).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.renderedData = this.filteredData.splice(startIndex, this.paginator.pageSize);

      return this.renderedData;
    });
  }

  disconnect() {}
}
