import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {CharacterApi} from '../../../../../../../domain/service/api/character.api';
import {RelationshipApi} from '../../../../../../../domain/service/api/relationship.api';
import {defer} from 'lodash';
import {Book} from '../../../../../../../domain/model/book';
import {FormControl} from '@angular/forms';
import {FormBuilderService} from '../../../../../../../domain/service/form/form.builder';
import {charactersToNodes, relationshipsToEdges} from '../../../../../../../domain/function/network.helper';
import {GraphEdge, GraphNode} from '../../../../../../../domain/model/network';
import {Character} from '../../../../../../../domain/model/character';
import {Relationship} from '../../../../../../../domain/model/relationship';
import {Planet} from '../../../../../../../domain/model/planet';
import {BookApi} from '../../../../../../../domain/service/api/book.api';
import {PlanetApi} from '../../../../../../../domain/service/api/planet.api';
import {SpoilerAlertComponent} from '../../../../../shared/modal/spoiler-alert.component';
import {Modal} from '../../../../../../../domain/ionic/modal.ionic';

@Component({
  selector: 'characters-relationships-graph',
  templateUrl: './characters-relationships-graph.component.html'
})
export class CharactersRelationshipsGraphComponent extends BaseComponent implements OnInit {
  nodes: GraphNode[] = [];
  edges: GraphEdge[] = [];
  characters: Character[] = [];
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
    this.subscribe(this.characterApi.allCharacters(), characters => {
      this.characters = characters;
      this.nodes = charactersToNodes(characters);
    });
    this.subscribe(this.relationshipApi.allRelationship(), relationships => {
      this.setRelationships(relationships);
    });
    this.subscribe(this.bookApi.allBooks(), books => {
      this.books = books;
    });
    this.subscribe(this.planetApi.allPlanets(), planets => {
      this.planets = planets;
    });
    defer(() => {
      this.characterApi.fetchAllCharacter();
      this.relationshipApi.fetchAllRelationship();
      this.bookApi.fetchAllBooks();
      this.planetApi.fetchAllPlanets();
    });

    await this.openModal();
  }

  setRelationships(relationships: Relationship[]) {
    this.relationships = relationships;
    this.edges = relationshipsToEdges(this.relationships);
  }

  applyFilters() {
    this.nodes = charactersToNodes(this.filteredCharacters());
    this.edges = relationshipsToEdges(this.filteredRelationships());
  }

  filteredCharacters(): Character[] {
    let filteredCharacters = this.characters;
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

  async openModal(): Promise<void> {
    await this.modal.present({
      component: SpoilerAlertComponent,
      cssClass: 'custom-modal',
    });
  }
}
