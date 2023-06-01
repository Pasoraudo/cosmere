import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdnPipe} from 'app/ui/shared/pipe/cdn.pipe';
import {TranslatorPipe} from 'app/ui/shared/pipe/trans.pipe';

@NgModule({
  declarations: [
    CdnPipe,
    TranslatorPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CdnPipe,
    TranslatorPipe,
  ]
})
export class PipeModule {
}
