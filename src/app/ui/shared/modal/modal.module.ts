import {NgModule} from '@angular/core';
import {SpoilerAlertComponent} from './spoiler-alert.component';
import {PipeModule} from '../pipe/pipe.module';
import {FuseCardModule} from '../../../../@fuse/components/card';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../components/shared.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    SpoilerAlertComponent
  ],
  imports: [
    PipeModule,
    FuseCardModule,
    MatButtonModule,
    SharedModule,
    CommonModule
  ],
  exports: [
    SpoilerAlertComponent,
  ]
})
export class ModalModule {
}
