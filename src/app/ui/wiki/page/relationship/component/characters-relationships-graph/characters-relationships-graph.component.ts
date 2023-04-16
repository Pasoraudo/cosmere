import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {CharacterApi} from '../../../../../../../domain/service/api/character.api';
import {RelationshipApi} from '../../../../../../../domain/service/api/relationship.api';
import {defer} from 'lodash';
import {Book} from '../../../../../../../domain/model/book';
import {FormGroup} from '@angular/forms';
import {FormBuilderService} from '../../../../../../../domain/service/form/form.builder';
import {charactersToNodes, relationshipsToEdges} from '../../../../../../../domain/function/network.helper';
import {debounceTime, Observable, of, Subject} from 'rxjs';
import {GraphEdge, GraphNode} from '../../../../../../../domain/model/network';

@Component({
  selector: 'characters-relationships-graph',
  templateUrl: './characters-relationships-graph.component.html'
})
export class CharactersRelationshipsGraphComponent extends BaseComponent implements OnInit, OnChanges {
  nodes$ = new Subject<GraphNode[]>();
  edges$ = new Subject<GraphEdge[]>();
  nodes: GraphNode[] = [];
  edges: GraphEdge[] = [];
  books: Book[];
  planets: string[];
  form: FormGroup;

  constructor(private characterApi: CharacterApi, private relationshipApi: RelationshipApi, private formBuilder: FormBuilderService) {
    super();
  }

  async ngOnInit() {
    this.subscribe(this.characterApi.allCharacters(), characters => {
      console.log('nodes', characters);
      this.nodes = charactersToNodes(characters);
      this.nodes$.next(this.nodes);
    });
    this.subscribe(this.relationshipApi.allRelationship(), relationships => {
      this.edges = relationshipsToEdges(relationships);
      this.edges$.next(this.edges);
    });
    this.edges$.subscribe((edges) => {
      console.log('New edges:', edges);
    });
    defer(() => {
      this.characterApi.fetchAllCharacter();
      this.relationshipApi.fetchAllRelationship();
    });

    this.books = [
      {
        id: '1',
        title: 'mistborn'
      },
      {
        id: '2',
        title: 'storm archive'
      }
    ];
    this.planets = ['yolen', 'scadrial', 'roshar'];

    this.buildForm();
  }

  selectAllFilters() {
    this.form.get('bookFilter').setValue(this.books.map(book => book.title));
    this.form.get('planetFilter').setValue(this.planets);
  }

  buildForm() {
    if (this.form)
      return;

    this.form = this.formBuilder.build({
      bookFilter: [],
      planetFilter: []
    }, []);

    this.selectAllFilters()
  }

  onClick() {
    console.log('onclick');
    const newEdges = [
      { from: '2', to: '2' },
      { from: '1', to: '1' },
    ];
    this.edges = newEdges;
    this.edges$.next(newEdges);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('aaaaaaaaaaa');
  }
}
