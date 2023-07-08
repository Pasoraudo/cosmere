import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomePage} from './home.page';
import {homeRouting} from './home.routing';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from '../../../shared/components/shared.module';
import {PipeModule} from '../../../shared/pipe/pipe.module';
import {CdkScrollableModule, ScrollingModule} from '@angular/cdk/scrolling';
import {D3Module} from '../../../infrastructure/d3/d3.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    RouterModule.forChild(homeRouting),
    MatButtonModule,
    MatIconModule,
    SharedModule,
    PipeModule,
    CdkScrollableModule,
    ScrollingModule,
    D3Module,
  ]
})
export class HomeModule {
}
