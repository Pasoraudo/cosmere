import {NgModule} from '@angular/core';
import {SpoilerAlertComponent} from './spoiler-alert.component';
import {PipeModule} from '../pipe/pipe.module';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../components/shared.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    SpoilerAlertComponent
  ],
  imports: [
    PipeModule,
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
