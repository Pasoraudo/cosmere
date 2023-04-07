import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RelationshipPage} from './relationship.page';
import {relationshipRouting} from './relationship.routing';
import {GraphModule} from '../../../shared/components/graph/graph.module';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {FuseCardModule} from '../../../../../@fuse/components/card';

@NgModule({
  declarations: [
    RelationshipPage
  ],
  imports: [
    RouterModule.forChild(relationshipRouting),
    GraphModule,
    CdkScrollableModule,
    FuseCardModule
  ]
})
export class RelationshipModule {
}
