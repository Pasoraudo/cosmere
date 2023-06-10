import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {CharacterApi} from '../../../../../../../domain/service/api/character.api';
import {RelationshipApi} from '../../../../../../../domain/service/api/relationship.api';
import {defer} from 'lodash';
import {FormBuilderService} from '../../../../../../../domain/service/form/form.builder';
import {
  characterIdsFromRelationships,
  charactersToD3Nodes,
  relationshipsToLinks
} from '../../../../../../../domain/function/network.helper';
import {D3Link, D3Node} from '../../../../../infrastructure/vis/model/network';
import {Character} from '../../../../../../../domain/model/character';
import {Relationship} from '../../../../../../../domain/model/relationship';
import {BookApi} from '../../../../../../../domain/service/api/book.api';
import {PlanetApi} from '../../../../../../../domain/service/api/planet.api';
import {Modal} from '../../../../../../../domain/ionic/modal.ionic';
import {UndirectedGraph} from 'graphology';
import louvain from 'graphology-communities-louvain';
import * as seedrandom from 'seedrandom';
import {Configuration} from '../../../../../../../domain/model/configuration';
import {ConfigurationApi} from '../../../../../../../domain/service/api/configuration.api';

@Component({
  selector: 'characters-relationships-graph',
  templateUrl: './characters-relationships-graph.component.html'
})
export class CharactersRelationshipsGraphComponent extends BaseComponent implements OnInit {
  nodes: D3Node[] = [];
  edges: D3Link[] = [];
  characters: Character[] = [];
  relationships: Relationship[] = [];
  configuration: Configuration;

  constructor(private characterApi: CharacterApi, private relationshipApi: RelationshipApi, private formBuilder: FormBuilderService,
              private bookApi: BookApi, private planetApi: PlanetApi, private modal: Modal, private configurationApi: ConfigurationApi) {
    super();
  }

  async ngOnInit() {
    this.subscribe(this.characterApi.cosmereCharacters(), characters => {
      this.onCharactersChanges(characters);
    });
    this.subscribe(this.relationshipApi.cosmereRelationships(), relationships => {
      this.onRelationshipsChanges(relationships);
    });
    this.subscribe(this.configurationApi.configuration(), (configuration) => this.onConfigurationChanges(configuration));

    defer(() => {
      this.characterApi.fetchAllCosmereCharacter();
      this.relationshipApi.fetchAllCosmereRelationship();
    });
  }

  regenerateNetworkParameters() {
    this.edges = relationshipsToLinks(this.filterRelationships(this.relationships));

    const graph = new UndirectedGraph();
    const characterIds: string[] = characterIdsFromRelationships(this.relationships);
    characterIds.forEach(characterId => graph.addNode(characterId));
    this.filterRelationships(this.relationships).forEach(relationship => graph.addEdge(relationship.characterId1, relationship.characterId2));
    const communities = louvain(graph, {rng: seedrandom('1231312'), resolution: 2});
    this.nodes = charactersToD3Nodes(this.filterCharacters(this.characters), this.filterRelationships(this.relationships))
      .filter(node => this.edges.map(edge => edge.source).includes(node.id) || this.edges.map(edge => edge.target).includes(node.id));

    this.nodes = this.nodes.map(node => {
      return {
        ...node,
        group: communities[node.id] as unknown as string,
      };
    });
    this.edges = this.edges.map(edge => {
      const target = this.nodes.find(node => node.id === edge.target);
      const source = this.nodes.find(node => node.id === edge.source);
      if (target === undefined || source === undefined)
        return edge;
      const community = target.score > source.score ? communities[target.id] : communities[source.id];
      return {
        ...edge,
        group: community as unknown as string,
      };
    });
  }

  filterCharacters(characters: Character[]): Character[] {
    return characters;
  }

  filterRelationships(relationship: Relationship[]): Relationship[] {
    let filteredRelationships = relationship;

    if (this.configuration.books.length > 0) {
      filteredRelationships = filteredRelationships.filter(relationship => this.configuration.books.includes(relationship.bookId));
    }

    return filteredRelationships;
  }

  onCharactersChanges(characters: Character[]) {
    this.characters = characters;
    this.regenerateNetworkParameters();
  }

  onRelationshipsChanges(relationships: Relationship[]) {
    this.relationships = relationships;
    this.regenerateNetworkParameters();
  }

  onConfigurationChanges(configuration: Configuration): void {
    this.configuration = configuration;
    this.regenerateNetworkParameters();
  }
}
