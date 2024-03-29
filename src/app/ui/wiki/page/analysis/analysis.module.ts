import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AnalysisPage} from './analysis.page';
import {analysisRouting} from './analysis.routing';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {D3Module} from '../../../infrastructure/d3/d3.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/components/shared.module';
import {PipeModule} from '../../../shared/pipe/pipe.module';

@NgModule({
  declarations: [
    AnalysisPage
  ],
  imports: [
    RouterModule.forChild(analysisRouting),
    CdkScrollableModule,
    D3Module,
    CommonModule,
    SharedModule,
    PipeModule
  ]
})
export class AnalysisModule {
}
