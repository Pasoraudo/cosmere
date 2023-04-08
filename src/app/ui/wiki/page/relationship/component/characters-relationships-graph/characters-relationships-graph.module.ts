import {NgModule} from '@angular/core';
import {CharactersRelationshipsGraphComponent} from './characters-relationships-graph.component';
import {FuseCardModule} from '../../../../../../../@fuse/components/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {PipeModule} from '../../../../../shared/pipe/pipe.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    CharactersRelationshipsGraphComponent
  ],
  imports: [
    FuseCardModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    PipeModule,
    ReactiveFormsModule
  ],
  exports: [
    CharactersRelationshipsGraphComponent
  ]
})
export class CharactersRelationshipsGraphModule {
}
