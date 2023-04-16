import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RelationshipPage} from './relationship.page';
import {relationshipRouting} from './relationship.routing';
import {CharactersRelationshipsGraphModule} from './component/characters-relationships-graph/characters-relationships-graph.module';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {FuseCardModule} from '../../../../../@fuse/components/card';

@NgModule({
  declarations: [
    RelationshipPage
  ],
  imports: [
    RouterModule.forChild(relationshipRouting),
    CharactersRelationshipsGraphModule,
    CdkScrollableModule,
    FuseCardModule
  ]
})
export class RelationshipModule {
}
