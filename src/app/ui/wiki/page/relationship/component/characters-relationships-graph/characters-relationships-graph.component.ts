import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {CharacterApi} from '../../../../../../../domain/service/api/character.api';
import {RelationshipApi} from '../../../../../../../domain/service/api/relationship.api';
import {defer} from 'lodash';
import {Book} from '../../../../../../../domain/model/book';
import {FormGroup} from '@angular/forms';
import {FormBuilderService} from '../../../../../../../domain/service/form/form.builder';
import {charactersToNodes, relationshipsToEdges} from '../../../../../../../domain/function/network.helper';
import {GraphEdge, GraphNode} from '../../../../../../../domain/model/network';
import {Character} from '../../../../../../../domain/model/character';
import {Relationship} from '../../../../../../../domain/model/relationship';
import {Planet} from '../../../../../../../domain/model/planet';
import {BookApi} from '../../../../../../../domain/service/api/book.api';
import {PlanetApi} from '../../../../../../../domain/service/api/planet.api';

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
  selectedBooks: string[];
  selectedPlanets: string[];
  form: FormGroup;

  constructor(private characterApi: CharacterApi, private relationshipApi: RelationshipApi, private formBuilder: FormBuilderService, private bookApi: BookApi,
              private planetApi: PlanetApi) {
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
      console.log('books', books);
      this.books = books;
      this.selectedBooks = this.books.map(book => book.title);
    });
    this.subscribe(this.planetApi.allPlanets(), planets => {
      console.log('planets', planets);
      this.planets = planets;
      this.selectedPlanets = this.planets.map(planet => planet.name);
    });
    defer(() => {
      this.characterApi.fetchAllCharacter();
      this.relationshipApi.fetchAllRelationship();
      this.bookApi.fetchAllBooks();
      this.planetApi.fetchAllPlanets();
    });

    this.buildForm();
  }

  buildForm() {
    if (this.form)
      return;

    this.form = this.formBuilder.build({
      bookFilter: this.selectedBooks,
      planetFilter: this.selectedPlanets
    }, []);
  }

  setRelationships(relationships: Relationship[]) {
    this.relationships = relationships;
    this.edges = relationshipsToEdges(this.relationships);
  }

  applyFilters() {
    let filteredCharacters = this.characters;
    const selectedBooksIds = this.books.filter(book => this.selectedBooks.includes(book.title)).map(book => book.id);

    filteredCharacters = filteredCharacters.filter(character => character.bookIds.filter(bookId => selectedBooksIds.includes(bookId)).length > 0)
    filteredCharacters = filteredCharacters.filter(character => this.selectedPlanets.includes(character.planet));
    this.nodes = charactersToNodes(filteredCharacters);
    console.log('char char', selectedBooksIds);
  }
}
