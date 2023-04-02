import {NgModule} from '@angular/core';
import {SharedModule} from 'app/shared/shared.module';
import {LayoutNoBarComponent} from './layout-no-bar.component';
import {RouterModule} from '@angular/router';


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


