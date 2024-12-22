import {NgModule} from '@angular/core';
import {AppLangSelectComponent} from './app-lang-select.component';
import {AppSelectAutocompleteEntityComponent} from './input/app-select-autocomplete-entity.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgSelectModule} from '@ng-select/ng-select';
import {CommonModule} from '@angular/common';
import {AppFormFieldComponent} from './input/form-field.component';
import {AppFormLabelComponent} from './input/form-label.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {PipeModule} from '../../pipe/pipe.module';

@NgModule({
  declarations: [
    AppLangSelectComponent,
    AppSelectAutocompleteEntityComponent,
    AppFormFieldComponent,
    AppFormLabelComponent
  ],
  imports: [
    FormsModule,
    MatInputModule,
    NgSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatOptionModule,
    MatSelectModule,
    PipeModule
  ],
  exports: [
    AppLangSelectComponent
  ]
})
export class FormModule {
}
