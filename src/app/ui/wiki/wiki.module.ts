import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {wikiRouting} from './wiki.routing';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(wikiRouting),
  ],
})
export class WikiModule {
}
