import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NetworkPage} from './network.page';
import {networkRouting} from './network.routing';
import {CharactersRelationshipsGraphModule} from './component/characters-relationships-graph/characters-relationships-graph.module';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {SharedModule} from '../../../shared/components/shared.module';

@NgModule({
  declarations: [
    NetworkPage
  ],
    imports: [
        RouterModule.forChild(networkRouting),
        CharactersRelationshipsGraphModule,
        CdkScrollableModule,
        SharedModule
    ]
})
export class NetworkModule {
}
