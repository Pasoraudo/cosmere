import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [ReactiveFormsModule, MatDialogModule, MatAutocompleteModule, MatInputModule, CommonModule],
  providers: [HttpClient],
  exports: [],
})
export class DomainModule {
}
