import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BasePage} from '../../../shared/page/base.page';
import {D3Link, D3Node} from '../../../infrastructure/vis/model/network';
import {
  characterIdsFromRelationships,
  charactersToD3Nodes,
  relationshipsToLinks
} from '../../../../../domain/function/network.helper';
import {Character} from '../../../../../domain/model/character';
import {Relationship} from '../../../../../domain/model/relationship';
import {CharacterApi} from '../../../../../domain/service/api/character.api';
import {RelationshipApi} from '../../../../../domain/service/api/relationship.api';
import {defer} from 'lodash';
import {wikiNavigation} from '../../../../layout/navigation/wiki-navigation';
import {FuseNavigationItem} from '../../../../../@fuse/components/navigation';
import {UndirectedGraph} from 'graphology';
import louvain from 'graphology-communities-louvain';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  encapsulation: ViewEncapsulation.None
})
export class HomePage extends BasePage implements OnInit {
  navigation: FuseNavigationItem[] = wikiNavigation;
  nodes: D3Node[] = [];
  edges: D3Link[] = [];
  characters: Character[] = [];
  relationships: Relationship[] = [];
  networkOptions: any = {
    zoom: false
  }

  constructor(private characterApi: CharacterApi, private relationshipApi: RelationshipApi) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.characterApi.cosmereCharacters(), characters => this.onCharactersChanges(characters));
    this.subscribe(this.relationshipApi.relationshipsByBook('mistborn1'),
      relationships => this.onRelationshipsChanges(relationships)
    );

    defer(() => {
      this.characterApi.fetchAllCosmereCharacter();
      this.relationshipApi.fetchAllCosmereRelationship();
    });
  }

  generateNetworkParameters() {
    this.edges = relationshipsToLinks(this.relationships);

    const graph = new UndirectedGraph();
    const characterIds: string[] = characterIdsFromRelationships(this.relationships);
    characterIds.forEach(characterId => graph.addNode(characterId));
    this.relationships.forEach(relationship => graph.addEdge(relationship.characterId1, relationship.characterId2));
    const communities = louvain(graph);

    this.nodes = charactersToD3Nodes(this.characters, this.relationships)
      .filter(node => this.edges.map(edge => edge.source).includes(node.id) || this.edges.map(edge => edge.target).includes(node.id));
    this.nodes = this.nodes.map(node => {
      return {
        ...node,
        group: communities[node.id] as unknown as string,
      };
    });
  }

  onCharactersChanges(characters: Character[]) {
    this.characters = characters;
    this.generateNetworkParameters();
  }

  onRelationshipsChanges(relationships: Relationship[]) {
    this.relationships = relationships;
    this.generateNetworkParameters();
  }
}
