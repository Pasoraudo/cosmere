import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {wikiRouting} from 'app/ui/wiki/wiki.routing';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(wikiRouting),
  ],
})
export class WikiModule {
}
