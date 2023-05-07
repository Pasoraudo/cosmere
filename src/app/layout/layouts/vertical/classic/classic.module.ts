import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {FuseLoadingBarModule} from '@fuse/components/loading-bar';
import {FuseNavigationModule} from '@fuse/components/navigation';
import {SharedModule} from 'app/ui/shared/components/shared.module';
import {ClassicLayoutComponent} from 'app/layout/layouts/vertical/classic/classic.component';
import {SearchModule} from '../../common/search/search.module';
import {CommonModule} from '@angular/common';

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
    FuseLoadingBarModule,
    FuseNavigationModule,
    SearchModule,
    SharedModule,
    CommonModule,
  ],
  exports: [
    ClassicLayoutComponent
  ]
})
export class ClassicLayoutModule {
}
