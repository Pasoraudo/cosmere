import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomePage} from './home.page';
import {homeRouting} from './home.routing';
import {SharedModule} from '../../../shared/components/shared.module';
import {CdkScrollableModule, ScrollingModule} from '@angular/cdk/scrolling';
import {FuseCardModule} from '../../../../../@fuse/components/card';
import {PipeModule} from '../../../shared/pipe/pipe.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    RouterModule.forChild(homeRouting),
    SharedModule,
    FuseCardModule,
    PipeModule,
    CdkScrollableModule,
    ScrollingModule
  ]
})
export class HomeModule {
}
