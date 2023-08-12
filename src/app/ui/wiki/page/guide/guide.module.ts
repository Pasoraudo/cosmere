import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GuidePage} from './guide.page';
import {guideRouting} from './guide.routing';
import {SharedModule} from '../../../shared/components/shared.module';
import {D3Module} from '../../../infrastructure/d3/d3.module';

@NgModule({
  declarations: [
    GuidePage
  ],
  imports: [
    RouterModule.forChild(guideRouting),
    SharedModule,
    D3Module
  ]
})
export class GuideModule {
}
