import {NgModule} from '@angular/core';
import {SharedModule} from 'app/ui/shared/components/shared.module';
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


