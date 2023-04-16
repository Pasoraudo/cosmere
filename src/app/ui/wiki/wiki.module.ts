import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'app/ui/shared/components/shared.module';
import {wikiRouting} from 'app/ui/wiki/wiki.routing';
import {FuseCardModule} from '../../../@fuse/components/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(wikiRouting),
    MatButtonModule,
    MatIconModule,
    SharedModule,
    FuseCardModule,
  ]
})
export class WikiModule {
}
