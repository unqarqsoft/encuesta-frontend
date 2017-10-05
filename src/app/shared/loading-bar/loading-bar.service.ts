import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';

@Injectable()
export class LoadingBarService {
  public show: boolean = false;
}
