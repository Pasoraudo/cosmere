import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BasePage} from '../../../shared/page/base.page';
import {RelationshipApi} from '../../../../../domain/service/api/relationship.api';
import {Relationship} from '../../../../../domain/model/relationship';
import Graph, {UndirectedGraph} from 'graphology';
import {characterIdsFromRelationships} from '../../../../../domain/function/network.helper';
import {defer, reject} from 'lodash';
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
import {largestConnectedComponentSubgraph} from 'graphology-components';
import {
  calculateClusteringCoefficient,
  calculateEccentricityCoefficient,
} from '../../../../function/graphology.helper';
import {Character} from '../../../../../domain/model/character';
import {CharacterApi} from '../../../../../domain/service/api/character.api';
import {isEmpty} from 'rxjs';
import {byId} from '../../../../../domain/function/search.helper';

@Component({
  selector: 'network',
  templateUrl: './analysis.page.html',
  encapsulation: ViewEncapsulation.None
})
export class AnalysisPage extends BasePage implements OnInit {
  relationships: Relationship[];
  characters: Character[];
  pagerankCosmere: BarChartItem[];
  eigenvectorCosmere: BarChartItem[];
  betweennessCosmere: BarChartItem[];
  closenessCosmere: BarChartItem[];
  degreeCentralityCosmere: BarChartItem[];
  pageRankNormalized: BarChartItem[];

  pagerankEigenvectorAndDegreeCentrality: Chart3DItem[] = [];
  configuration: Configuration = newConfiguration();

  constructor(private relationshipApi: RelationshipApi, private characterApi: CharacterApi, private configurationApi: ConfigurationApi) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.relationshipApi.cosmereRelationships(), relationships => this.onRelationshipsChanges(relationships));
    this.subscribe(this.characterApi.cosmereCharacters(), characters => this.onCharactersChanges(characters));
    this.subscribe(this.configurationApi.configuration(), configuration => this.onConfigurationChanges(configuration));

    defer(async () => {
      await this.relationshipApi.fetchAllCosmereRelationship();
      await this.characterApi.fetchAllCosmereCharacter();
    });
  }

  analyseNetwork(graph: Graph): void {
    const largestConnectedComponent = largestConnectedComponentSubgraph(graph);
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

    this.pageRankNormalized = normalizeBarChartItems(this.pagerankCosmere);
    const eigenvectorNormalized = normalizeBarChartItems(this.eigenvectorCosmere);
    const degreeCentralityNormalized = normalizeBarChartItems(this.degreeCentralityCosmere);

    this.pagerankEigenvectorAndDegreeCentrality = nodes.map(node => {
      return {
        label: node,
        x: this.pageRankNormalized.find(c => c.label === node).value,
        y: eigenvectorNormalized.find(c => c.label === node).value,
        z: degreeCentralityNormalized.find(c => c.label === node).value,
      }
    }).filter(p => p.x > 0.3 && p.y > 0.3);

    console.log('calculateClusteringCoefficient', calculateClusteringCoefficient(largestConnectedComponent));
    console.log('calculateEccentricityCoefficient', calculateEccentricityCoefficient(largestConnectedComponent));
  }

  onRelationshipsChanges(relationships: Relationship[]): void {
    this.relationships = relationships;
    this.analyseNetwork(this.graph());
  }

  onCharactersChanges(characters: Character[]): void {
    this.characters = characters;
    this.analyseNetwork(this.graph());
  }

  onConfigurationChanges(configuration: Configuration): void {
    this.configuration = configuration;
    this.analyseNetwork(this.graph());
  }

  filterRelationships(relationships: Relationship[]): Relationship[] {
    if (!this.configuration)
      return relationships;

    let filteredRelationships = relationships;

    if (this.configuration.books.length > 0) {
      filteredRelationships = filteredRelationships.filter(relationship => this.configuration.books.includes(relationship.bookId));
    }

    return filteredRelationships;
  }

  graph(): Graph {
    const filteredRelationships = this.filterRelationships(this.relationships);
    const graph = new UndirectedGraph();
    const characterIds: string[] = characterIdsFromRelationships(filteredRelationships);
    characterIds.forEach(characterId => graph.addNode(this.getCharacterName(characterId)));
    filteredRelationships.forEach(relationship =>
      graph.addEdge(this.getCharacterName(relationship.characterId1), this.getCharacterName(relationship.characterId2)));
    return graph;
  }

  getCharacterName(id: string): string {
    if (this.characters.length === 0)
      return id;

    const character = byId(id, this.characters);
    if (!character)
      return id;
    if (!character.name || character.name === '')
      return id;

    return character.name;
  }
}
