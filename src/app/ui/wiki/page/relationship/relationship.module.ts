import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RelationshipPage} from './relationship.page';
import {relationshipRouting} from './relationship.routing';
import {GraphModule} from '../../../shared/components/graph/graph.module';

@NgModule({
  declarations: [
    RelationshipPage
  ],
  imports: [
    RouterModule.forChild(relationshipRouting),
    GraphModule
  ]
})
export class RelationshipModule {
}
