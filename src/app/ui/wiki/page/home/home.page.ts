import { Component, ViewEncapsulation } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {BasePage} from '../../../shared/page/base.page';

@Component({
    selector     : 'home',
    templateUrl  : './home.page.html',
    encapsulation: ViewEncapsulation.None
})
export class HomePage extends BasePage
{
    constructor() {
      super();
    }
}
