import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {AutocompleteComponent} from './form/autocomplete.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [AutocompleteComponent],
  entryComponents: [],
  imports: [ReactiveFormsModule, MatDialogModule, MatAutocompleteModule, MatInputModule, CommonModule],
  providers: [HttpClient],
  exports: [AutocompleteComponent],
})
export class DomainModule {
}
