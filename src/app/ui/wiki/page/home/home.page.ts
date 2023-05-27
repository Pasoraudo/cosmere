import {Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {BasePage} from '../../../shared/page/base.page';
import {D3Link, D3Node} from '../../../infrastructure/vis/model/network';
import {charactersToD3Nodes, relationshipsToLinks} from '../../../../../domain/function/network.helper';
import {Character} from '../../../../../domain/model/character';
import {Relationship} from '../../../../../domain/model/relationship';
import {CharacterApi} from '../../../../../domain/service/api/character.api';
import {RelationshipApi} from '../../../../../domain/service/api/relationship.api';
import {defer} from 'lodash';
import {wikiNavigation} from '../../../../layout/navigation/wiki-navigation';
import {FuseNavigationItem} from '../../../../../@fuse/components/navigation';

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
  relationshipCharacters: Character[] = [];
  relationships: Relationship[] = [];

  constructor(private characterApi: CharacterApi, private relationshipApi: RelationshipApi) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.characterApi.cosmereCharacters(), characters => {
      this.setCharacters(characters);
      this.setRelationships(this.relationships);
    });
    this.subscribe(this.relationshipApi.relationshipsByBook('mistborn1'), relationships => {
      this.setRelationships(relationships);
      this.setCharacters(this.characters);
    });
    defer(() => {
      this.characterApi.fetchAllCosmereCharacter();
      this.relationshipApi.fetchAllCosmereRelationship();
    });
  }

  setCharacters(characters: Character[]) {
    this.characters = characters;
  }

  setRelationships(relationships: Relationship[]) {
    this.relationships = relationships;
    let relationshipCharacters = this.relationships.map(relationship => relationship.characterId1);
    relationshipCharacters = relationshipCharacters.concat(this.relationships.map(relationship => relationship.characterId2))
    relationshipCharacters = Array.from(new Set<string>(relationshipCharacters));
    this.relationshipCharacters = this.characters.filter(character => relationshipCharacters.includes(character.id));

    this.nodes = charactersToD3Nodes(this.relationshipCharacters, this.relationships);
    this.edges = relationshipsToLinks(this.relationships);
  }

  protected readonly wikiNavigation = wikiNavigation;
}
