import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { HomeComponent } from 'app/ui/home/home.component';
import { homeRoutes } from 'app/ui/home/home.routing';
import {FuseCardModule} from '../../../@fuse/components/card';

@NgModule({
    declarations: [
        HomeComponent
    ],
  imports: [
    RouterModule.forChild(homeRoutes),
    MatButtonModule,
    MatIconModule,
    SharedModule,
    FuseCardModule
  ]
})
export class HomeModule
{
}
