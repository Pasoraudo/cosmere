import { Component, ViewEncapsulation } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {BasePage} from '../../../shared/page/base.page';

@Component({
    selector     : 'relationship',
    templateUrl  : './relationship.page.html',
    encapsulation: ViewEncapsulation.None
})
export class RelationshipPage extends BasePage
{
    constructor() {
      super();
    }
}
