import {NgModule} from '@angular/core';
import {BarChartComponent} from './component/bar-chart.component';
import {D3NetworkComponent} from './component/network.component';
import {Chart3DComponent} from './component/3D-chart.component';

@NgModule({
  declarations: [
    BarChartComponent,
    D3NetworkComponent,
    Chart3DComponent
  ],
  imports: [],
  exports: [
    BarChartComponent,
    D3NetworkComponent,
    Chart3DComponent
  ]
})
export class D3Module {
}
