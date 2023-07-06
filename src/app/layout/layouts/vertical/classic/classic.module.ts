import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {CommonModule} from '@angular/common';
import {ClassicLayoutComponent} from './classic.component';
import {SharedModule} from '../../../../ui/shared/components/shared.module';

@NgModule({
  declarations: [
    ClassicLayoutComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    CommonModule,
  ],
  exports: [
    ClassicLayoutComponent
  ]
})
export class ClassicLayoutModule {
}
