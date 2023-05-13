import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {StatisticsPage} from './statistics.page';
import {statisticsRouting} from './statistics.routing';
import {BarChartModule} from './component/bar-chart/bar-chart.module';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {FuseCardModule} from '../../../../../@fuse/components/card';

@NgModule({
  declarations: [
    StatisticsPage
  ],
  imports: [
    RouterModule.forChild(statisticsRouting),
    BarChartModule,
    CdkScrollableModule,
    FuseCardModule
  ]
})
export class StatisticsModule {
}
