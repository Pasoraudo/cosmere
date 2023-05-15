import {NgModule} from '@angular/core';
import {BarChartComponent} from './component/bar-chart.component';
import {D3NetworkComponent} from './component/network.component';

@NgModule({
  declarations: [
    BarChartComponent,
    D3NetworkComponent
  ],
  imports: [],
  exports: [
    BarChartComponent,
    D3NetworkComponent
  ]
})
export class D3Module {
}
