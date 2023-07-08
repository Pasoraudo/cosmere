import {NgModule} from '@angular/core';
import {LayoutNoBarComponent} from './layout-no-bar.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../components/shared.module';


@NgModule({
  declarations: [
    LayoutNoBarComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
  ],
  exports: [
    LayoutNoBarComponent
  ]
})

export class LayoutNoBarModule {
}


