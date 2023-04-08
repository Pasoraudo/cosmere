import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BasePage} from '../../../shared/page/base.page';

@Component({
  selector: 'relationship',
  templateUrl: './relationship.page.html',
  encapsulation: ViewEncapsulation.None
})
export class RelationshipPage extends BasePage implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {

  }


}
