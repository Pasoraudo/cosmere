import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomePage} from './home.page';
import {homeRouting} from './home.routing';
import {WikiModule} from '../../wiki.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from '../../../shared/components/shared.module';
import {FuseCardModule} from '../../../../../@fuse/components/card';
import {PipeModule} from '../../../shared/pipe/pipe.module';
import {CdkScrollableModule, ScrollingModule} from '@angular/cdk/scrolling';
import {D3Module} from '../../../infrastructure/d3/d3.module';
import {FuseNavigationModule} from '../../../../../@fuse/components/navigation';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    RouterModule.forChild(homeRouting),
    MatButtonModule,
    MatIconModule,
    SharedModule,
    FuseCardModule,
    PipeModule,
    CdkScrollableModule,
    ScrollingModule,
    D3Module,
    FuseNavigationModule,
  ]
})
export class HomeModule {
}
