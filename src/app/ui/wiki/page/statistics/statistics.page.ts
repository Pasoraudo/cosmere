import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BasePage} from '../../../shared/page/base.page';
import {RelationshipApi} from '../../../../../domain/service/api/relationship.api';
import {Relationship} from '../../../../../domain/model/relationship';
import Graph from 'graphology';
import {characterIdsFromRelationships} from '../../../../../domain/function/network.helper';
import {reject} from 'lodash';
import {pagerank} from 'graphology-metrics/centrality';
import closenessCentrality from 'graphology-metrics/centrality/closeness';
import eigenvectorCentrality from 'graphology-metrics/centrality/eigenvector';
import betweennessCentrality from 'graphology-metrics/centrality/betweenness';
import {BarChartItem, mapToBarChartItemArray} from '../../../infrastructure/d3/model/barChar.model';


@Component({
  selector: 'relationship',
  templateUrl: './statistics.page.html',
  encapsulation: ViewEncapsulation.None
})
export class StatisticsPage extends BasePage implements OnInit {
  graph: Graph;
  pagerankCosmere: BarChartItem[];
  eigenvectorCosmere: BarChartItem[];
  betweennessCosmere: BarChartItem[];
  closenessCosmere: BarChartItem[];


  constructor(private relationshipApi: RelationshipApi) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.relationshipApi.cosmereRelationships(), relationships => this.calculateGlobalStats(relationships))
    this.relationshipApi.fetchAllCosmereRelationship();
  }

  calculateGlobalStats(relationships: Relationship[]): void {
    this.graph = new Graph();
    const characterIds: string[] = characterIdsFromRelationships(relationships);
    characterIds.forEach(characterId => this.graph.addNode(characterId));
    relationships.forEach(relationship => this.graph.addEdge(relationship.characterId1, relationship.characterId2));

    const pagerankCosmere = pagerank(this.graph);
    this.pagerankCosmere = mapToBarChartItemArray(pagerankCosmere);

    const closenessCosmere = closenessCentrality(this.graph);
    this.closenessCosmere = mapToBarChartItemArray(closenessCosmere);
    this.closenessCosmere = reject(this.closenessCosmere, e => e.value === 1);

    const eigenvectorCosmere = eigenvectorCentrality(this.graph);
    this.eigenvectorCosmere = mapToBarChartItemArray(eigenvectorCosmere);

    const betweennessCosmere = betweennessCentrality(this.graph);
    this.betweennessCosmere = mapToBarChartItemArray(betweennessCosmere);
    console.log(closenessCosmere)
  }
}
