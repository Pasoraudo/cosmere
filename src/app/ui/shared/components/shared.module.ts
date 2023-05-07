import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GraphComponent} from './graph.component';
import {IconComponent} from './icon.component';
import {MatIconModule} from '@angular/material/icon';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [
    GraphComponent,
    IconComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    IonicModule,
  ],
  exports: [
    GraphComponent,
    IconComponent
  ]
})
export class SharedModule {
}
