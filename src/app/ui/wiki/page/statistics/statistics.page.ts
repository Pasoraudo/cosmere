import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BasePage} from '../../../shared/page/base.page';
import {RelationshipApi} from '../../../../../domain/service/api/relationship.api';
import {Relationship} from '../../../../../domain/model/relationship';
import Graph, {UndirectedGraph} from 'graphology';
import {
  characterIdsFromRelationships,
  charactersToD3Nodes,
  relationshipsToLinks
} from '../../../../../domain/function/network.helper';
import {reject} from 'lodash';
import {pagerank} from 'graphology-metrics/centrality';
import closenessCentrality from 'graphology-metrics/centrality/closeness';
import eigenvectorCentrality from 'graphology-metrics/centrality/eigenvector';
import betweennessCentrality from 'graphology-metrics/centrality/betweenness';
import {
  BarChartItem,
  mapToBarChartItemArray,
  normalizeBarChartItems
} from '../../../infrastructure/d3/model/barChar.model';
import {Chart3DItem} from '../../../infrastructure/d3/component/3D-chart.component';
import {degreeCentrality} from 'graphology-metrics/centrality/degree';
import {Configuration, newConfiguration} from '../../../../../domain/model/configuration';
import {ConfigurationApi} from '../../../../../domain/service/api/configuration.api';
import {Character} from '../../../../../domain/model/character';


@Component({
  selector: 'relationship',
  templateUrl: './statistics.page.html',
  encapsulation: ViewEncapsulation.None
})
export class StatisticsPage extends BasePage implements OnInit {
  relationships: Relationship[];
  pagerankCosmere: BarChartItem[];
  eigenvectorCosmere: BarChartItem[];
  betweennessCosmere: BarChartItem[];
  closenessCosmere: BarChartItem[];
  degreeCentralityCosmere: BarChartItem[];

  pagerankEigenvectorAndDegreeCentrality: Chart3DItem[] = [];
  configuration: Configuration = newConfiguration();

  constructor(private relationshipApi: RelationshipApi, private configurationApi: ConfigurationApi) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.relationshipApi.cosmereRelationships(), relationships => {
      this.relationships = relationships;
      const graph = this.generateGraph();
      this.analyseNetwork(graph);
    });
    this.subscribe(this.configurationApi.configuration(), (configuration) => this.configurationChanges(configuration));

    this.relationshipApi.fetchAllCosmereRelationship();
  }

  analyseNetwork(graph: Graph): void {
    const nodes: string[] = graph.nodes();

    const pagerankCosmere = pagerank(graph, {getEdgeWeight: undefined, maxIterations: 300});
    this.pagerankCosmere = mapToBarChartItemArray(pagerankCosmere);

    const betweennessCosmere = betweennessCentrality(graph);
    this.betweennessCosmere = mapToBarChartItemArray(betweennessCosmere);

    const closenessCosmere = closenessCentrality(graph);
    this.closenessCosmere = mapToBarChartItemArray(closenessCosmere);
    this.closenessCosmere = reject(this.closenessCosmere, e => e.value === 1);

    const eigenvectorCosmere = eigenvectorCentrality(graph, {maxIterations: 200});
    this.eigenvectorCosmere = mapToBarChartItemArray(eigenvectorCosmere);

    const degreeCentralityCosmere = degreeCentrality(graph);
    this.degreeCentralityCosmere = mapToBarChartItemArray(degreeCentralityCosmere);

    const pageRankNormalized = normalizeBarChartItems(this.pagerankCosmere);
    const eigenvectorNormalized = normalizeBarChartItems(this.eigenvectorCosmere);
    const degreeCentralityNormalized = normalizeBarChartItems(this.degreeCentralityCosmere);

    this.pagerankEigenvectorAndDegreeCentrality = nodes.map(node => {
      return {
        label: node,
        x: pageRankNormalized.find(c => c.label === node).value,
        y: eigenvectorNormalized.find(c => c.label === node).value,
        z: degreeCentralityNormalized.find(c => c.label === node).value,
      }
    });
    this.pagerankEigenvectorAndDegreeCentrality = this.pagerankEigenvectorAndDegreeCentrality.filter(p => p.x >= 0.1 && p.y > 0.1);
  }

  configurationChanges(configuration: Configuration): void {
    this.configuration = configuration;

    const graph = this.generateGraph();
    this.analyseNetwork(graph);
  }

  filterRelationships(relationships: Relationship[]): Relationship[] {
    let filteredRelationships = relationships;

    if (this.configuration.books.length > 0) {
      filteredRelationships = filteredRelationships.filter(relationship =>  this.configuration.books.includes(relationship.bookId));
    }

    return filteredRelationships;
  }

  generateGraph(): Graph {
    const filteredRelationships = this.filterRelationships(this.relationships);
    const graph = new UndirectedGraph();
    const characterIds: string[] = characterIdsFromRelationships(filteredRelationships);
    characterIds.forEach(characterId => graph.addNode(characterId));
    filteredRelationships.forEach(relationship => graph.addEdge(relationship.characterId1, relationship.characterId2));
    return graph;
  }
}
