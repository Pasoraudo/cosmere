import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {CharacterApi} from '../../../../../../../domain/service/api/character.api';
import {RelationshipApi} from '../../../../../../../domain/service/api/relationship.api';
import {defer} from 'lodash';
import {Book} from '../../../../../../../domain/model/book';
import {FormControl} from '@angular/forms';
import {FormBuilderService} from '../../../../../../../domain/service/form/form.builder';
import {charactersToD3Nodes, relationshipsToLinks} from '../../../../../../../domain/function/network.helper';
import {D3Link, D3Node} from '../../../../../infrastructure/vis/model/network';
import {Character} from '../../../../../../../domain/model/character';
import {Relationship} from '../../../../../../../domain/model/relationship';
import {Planet} from '../../../../../../../domain/model/planet';
import {BookApi} from '../../../../../../../domain/service/api/book.api';
import {PlanetApi} from '../../../../../../../domain/service/api/planet.api';
import {Modal} from '../../../../../../../domain/ionic/modal.ionic';

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
  groupByOptions: string[];

  bookControl: FormControl = new FormControl([]);
  planetControl: FormControl = new FormControl([]);
  groupByOption: FormControl = new FormControl([]);

  constructor(private characterApi: CharacterApi, private relationshipApi: RelationshipApi, private formBuilder: FormBuilderService, private bookApi: BookApi,
              private planetApi: PlanetApi, private modal: Modal) {
    super();
  }

  async ngOnInit() {
    this.subscribe(this.characterApi.cosmereCharacters(), characters => {
      this.setCharacters(characters);
    });
    this.subscribe(this.relationshipApi.cosmereRelationships(), relationships => {
      this.setRelationships(relationships);
      this.setCharacters(this.characters);
    });
    this.subscribe(this.bookApi.allBooks(), books => {
      this.books = books;
    });
    this.subscribe(this.planetApi.allPlanets(), planets => {
      this.planets = planets;
    });

    defer(() => {
      this.characterApi.fetchAllCosmereCharacter();
      this.relationshipApi.fetchAllCosmereRelationship();
      this.bookApi.fetchAllBooks();
      this.planetApi.fetchAllPlanets();
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
    this.nodes = charactersToD3Nodes(this.filteredCharacters(), this.filteredRelationships());
    this.edges = relationshipsToLinks(this.filteredRelationships());
  }

  filteredCharacters(): Character[] {
    let filteredCharacters = this.relationshipCharacters;
    if (this.bookControl.value.length > 0) {
      const selectedBooksIds = this.books.filter(book => this.bookControl.value.includes(book.title)).map(book => book.id);
      filteredCharacters = filteredCharacters.filter(character => character.bookIds.filter(bookId => selectedBooksIds.includes(bookId)).length > 0);
    }
    if (this.planetControl.value.length > 0)
      filteredCharacters = filteredCharacters.filter(character => this.planetControl.value.includes(character.planet));

    return filteredCharacters;
  }

  filteredRelationships(): Relationship[] {
    let filteredRelationships = this.relationships;

    if (this.bookControl.value.length > 0) {
      const selectedBooksIds = this.books.filter(book => this.bookControl.value.includes(book.title)).map(book => book.id);
      filteredRelationships = filteredRelationships.filter(relationship => selectedBooksIds.includes(relationship.bookId));
    }

    return filteredRelationships;
  }
}
