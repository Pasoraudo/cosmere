import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IconComponent} from './icon.component';
import {MatIconModule} from '@angular/material/icon';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [
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
    IconComponent
  ]
})
export class SharedModule {
}
