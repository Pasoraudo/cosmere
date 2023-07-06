import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IconComponent} from './icon.component';
import {MatIconModule} from '@angular/material/icon';
import {IonicModule} from '@ionic/angular';
import {ConfigurationComponent} from './configuratiom/configuration.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {PipeModule} from '../pipe/pipe.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {NavigationComponent} from './navigation.component';
import {LoadingBarComponent} from './loading-bar.component';
import {CardComponent} from './card.component';

@NgModule({
  declarations: [
    IconComponent,
    ConfigurationComponent,
    CardComponent,
    NavigationComponent,
    LoadingBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    IonicModule,
    MatFormFieldModule,
    MatSelectModule,
    PipeModule,
    MatMenuModule,
    MatButtonModule,
  ],
  exports: [
    IconComponent,
    ConfigurationComponent,
    CardComponent,
    NavigationComponent,
    LoadingBarComponent
  ]
})
export class SharedModule {
}
