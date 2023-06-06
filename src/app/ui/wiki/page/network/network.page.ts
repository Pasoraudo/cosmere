import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BasePage} from '../../../shared/page/base.page';

@Component({
  selector: 'network',
  templateUrl: './network.page.html',
  encapsulation: ViewEncapsulation.None
})
export class NetworkPage extends BasePage implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
