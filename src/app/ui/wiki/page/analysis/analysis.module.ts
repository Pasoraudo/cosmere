import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AnalysisPage} from './analysis.page';
import {analysisRouting} from './analysis.routing';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {D3Module} from '../../../infrastructure/d3/d3.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/components/shared.module';
import {FuseCardModule} from '../../../../../@fuse/components/card/card.module';

@NgModule({
  declarations: [
    AnalysisPage
  ],
    imports: [
        RouterModule.forChild(analysisRouting),
        CdkScrollableModule,
        FuseCardModule,
        D3Module,
        CommonModule,
        SharedModule
    ]
})
export class AnalysisModule {
}
