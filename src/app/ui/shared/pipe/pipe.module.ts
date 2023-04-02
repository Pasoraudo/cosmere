import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdnPipe} from 'app/ui/shared/pipe/cdn.pipe';
import {SortDescriptionPipe, SortNamePipe} from 'app/ui/shared/pipe/filter.pipe';
import {TranslatorPipe} from 'app/ui/shared/pipe/trans.pipe';
import {SortOrderPipe} from 'app/ui/shared/pipe/sort-order.pipe';

@NgModule({
  declarations: [
    CdnPipe,
    SortNamePipe,
    SortDescriptionPipe,
    TranslatorPipe,
    SortOrderPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CdnPipe,
    SortNamePipe,
    SortDescriptionPipe,
    TranslatorPipe,
    SortOrderPipe,
  ]
})
export class PipeModule {
}
