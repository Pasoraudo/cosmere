import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GuidePage} from './guide.page';
import {guideRouting} from './guide.routing';
import {SharedModule} from '../../../shared/components/shared.module';
import {D3Module} from '../../../infrastructure/d3/d3.module';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {PipeModule} from '../../../shared/pipe/pipe.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    GuidePage
  ],
    imports: [
        RouterModule.forChild(guideRouting),
        SharedModule,
        D3Module,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        PipeModule,
        ReactiveFormsModule
    ]
})
export class GuideModule {
}
