import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {CharacterApi} from '../../../../../../../domain/service/api/character.api';
import {RelationshipApi} from '../../../../../../../domain/service/api/relationship.api';
import {defer} from 'lodash';
import {Book} from '../../../../../../../domain/model/book';
import {FormControl} from '@angular/forms';
import {FormBuilderService} from '../../../../../../../domain/service/form/form.builder';
import {
  characterIdsFromRelationships,
  charactersToD3Nodes,
  relationshipsToLinks
} from '../../../../../../../domain/function/network.helper';
import {D3Link, D3Node} from '../../../../../infrastructure/vis/model/network';
import {Character} from '../../../../../../../domain/model/character';
import {Relationship} from '../../../../../../../domain/model/relationship';
import {Planet} from '../../../../../../../domain/model/planet';
import {BookApi} from '../../../../../../../domain/service/api/book.api';
import {PlanetApi} from '../../../../../../../domain/service/api/planet.api';
import {Modal} from '../../../../../../../domain/ionic/modal.ionic';
import {UndirectedGraph} from 'graphology';
import louvain from 'graphology-communities-louvain';
import * as seedrandom from 'seedrandom';
import {Configuration} from '../../../../../../../domain/model/configuration';
import {ConfigurationApi} from '../../../../../../../domain/service/api/configuration.api';
import {intersection} from 'lodash-es';

@Component({
  selector: 'characters-relationships-graph',
  templateUrl: './characters-relationships-graph.component.html'
})
export class CharactersRelationshipsGraphComponent extends BaseComponent implements OnInit {
  nodes: D3Node[] = [];
  edges: D3Link[] = [];
  characters: Character[] = [];
  relationshipCharacters: Character[] = [];
  relationships: Relationship[] = [];

  books: Book[];
  planets: Planet[];

  configuration: Configuration;
  constructor(private characterApi: CharacterApi, private relationshipApi: RelationshipApi, private formBuilder: FormBuilderService, private bookApi: BookApi,
              private planetApi: PlanetApi, private modal: Modal, private configurationApi: ConfigurationApi) {
    super();
  }

  async ngOnInit() {
    this.subscribe(this.characterApi.cosmereCharacters(), characters => {
      this.setCharacters(characters);
      this.setRelationships(this.relationships);
    });
    this.subscribe(this.relationshipApi.cosmereRelationships(), relationships => {
      this.setRelationships(relationships);
      this.setCharacters(this.characters);
    });
    this.subscribe(this.configurationApi.configuration(), (configuration) => this.setConfiguration(configuration));

    defer(() => {
      this.characterApi.fetchAllCosmereCharacter();
      this.relationshipApi.fetchAllCosmereRelationship();
    });
  }

  setCharacters(characters: Character[]) {
    this.characters = characters;
    this.applyFilters();
  }

  setRelationships(relationships: Relationship[]) {
    this.relationships = relationships;

    let relationshipCharacters = this.relationships.map(relationship => relationship.characterId1);
    relationshipCharacters = relationshipCharacters.concat(this.relationships.map(relationship => relationship.characterId2))
    relationshipCharacters = Array.from(new Set<string>(relationshipCharacters));
    this.relationshipCharacters = this.characters.filter(character => relationshipCharacters.includes(character.id));
    this.applyFilters();
  }

  applyFilters() {
    this.edges = relationshipsToLinks(this.filteredRelationships());
    this.nodes = charactersToD3Nodes(this.filteredCharacters(), this.filteredRelationships())
      .filter(node => this.edges.map(edge => edge.source).includes(node.id) || this.edges.map(edge => edge.target).includes(node.id));
    this.setCommunities();
  }

  filteredCharacters(): Character[] {
    let filteredCharacters = this.relationshipCharacters;
    // if (this.configuration.books.length > 0) {
    //   filteredCharacters = filteredCharacters.filter(character => intersection(character.bookIds, this.configuration.books).length > 0);
    // }
    // if (this.planetControl.value.length > 0)
    //   filteredCharacters = filteredCharacters.filter(character => this.planetControl.value.includes(character.planet));

    return filteredCharacters;
  }

  filteredRelationships(): Relationship[] {
    let filteredRelationships = this.relationships;

    if (this.configuration.books.length > 0) {
      filteredRelationships = filteredRelationships.filter(relationship =>  this.configuration.books.includes(relationship.bookId));
    }

    return filteredRelationships;
  }

  setCommunities(): void {
    const graph = new UndirectedGraph();
    const characterIds: string[] = characterIdsFromRelationships(this.relationships);
    characterIds.forEach(characterId => graph.addNode(characterId));
    this.relationships.forEach(relationship => graph.addEdge(relationship.characterId1, relationship.characterId2));
    const communities = louvain(graph, {rng: seedrandom('1231312'), resolution: 2});
    this.nodes = this.nodes.map(node => {
      return {
        ...node,
        group: communities[node.id],
      };
    });
  }

  setConfiguration(configuration: Configuration): void {
    this.configuration = configuration;
    this.applyFilters();
  }
}
