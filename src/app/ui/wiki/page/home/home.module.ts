import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomePage} from './home.page';
import {homeRouting} from './home.routing';
import {SharedModule} from '../../../shared/components/shared.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    RouterModule.forChild(homeRouting),
    SharedModule,
  ]
})
export class HomeModule {
}
