import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {StatisticsPage} from './statistics.page';
import {statisticsRouting} from './statistics.routing';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {FuseCardModule} from '../../../../../@fuse/components/card';
import {D3Module} from '../../../infrastructure/d3/d3.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    StatisticsPage
  ],
  imports: [
    RouterModule.forChild(statisticsRouting),
    CdkScrollableModule,
    FuseCardModule,
    D3Module,
    CommonModule
  ]
})
export class StatisticsModule {
}
