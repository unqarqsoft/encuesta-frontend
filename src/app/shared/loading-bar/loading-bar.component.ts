import { Component, OnInit, Input } from '@angular/core';

import { LoadingBarService } from './loading-bar.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css']
})
export class LoadingBarComponent implements OnInit {

  constructor(private loadingBarService: LoadingBarService) { }

  ngOnInit() {
  }

}
