import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RelationshipPage} from './relationship.page';
import {relationshipRouting} from './relationship.routing';
import {CharactersRelationshipsGraphModule} from './component/characters-relationships-graph/characters-relationships-graph.module';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {FuseCardModule} from '../../../../../@fuse/components/card';
import {SharedModule} from '../../../shared/components/shared.module';

@NgModule({
  declarations: [
    RelationshipPage
  ],
    imports: [
        RouterModule.forChild(relationshipRouting),
        CharactersRelationshipsGraphModule,
        CdkScrollableModule,
        FuseCardModule,
        SharedModule
    ]
})
export class RelationshipModule {
}
