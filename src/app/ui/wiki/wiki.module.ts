import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { HomeComponent } from 'app/ui/wiki/home/home.component';
import { wikiRoutes } from 'app/ui/wiki/wiki.routing';
import {FuseCardModule} from '../../../@fuse/components/card';
import {GraphModule} from '../shared/components/graph/graph.module';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(wikiRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        FuseCardModule,
        GraphModule
    ]
})
export class WikiModule
{
}
