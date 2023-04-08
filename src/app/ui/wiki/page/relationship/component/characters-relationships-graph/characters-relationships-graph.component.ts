import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataSet, Network} from 'vis';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {Character} from '../../../../../../../domain/model/character';
import {Relationship} from '../../../../../../../domain/model/relationship';
import {charactersToNodes, relationshipsToEdges} from '../../../../../../../domain/function/network.helper';
import {CharacterApi} from '../../../../../../../domain/service/api/character.api';
import {RelationshipApi} from '../../../../../../../domain/service/api/relationship.api';
import {defer} from 'lodash';
import {Book} from '../../../../../../../domain/model/book';
import {FormGroup} from '@angular/forms';
import {FormBuilderService} from '../../../../../../../domain/service/form/form.builder';

@Component({
  selector: 'characters-relationships-graph',
  templateUrl: './characters-relationships-graph.component.html'
})
export class CharactersRelationshipsGraphComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('network') el: ElementRef;

  networkInstance: any;
  container: any;
  characters: Character[];
  relationships: Relationship[];
  books: Book[];
  planets: string[];
  form: FormGroup;

  constructor(private characterApi: CharacterApi, private relationshipApi: RelationshipApi, private formBuilder: FormBuilderService) {
    super();
  }

  async ngOnInit() {
    this.subscribe(this.characterApi.allCharacters(), characters => {
      this.characters = characters;
      this.updateGraph();
    });
    this.subscribe(this.relationshipApi.allRelationship(), relationships => {
      console.log(relationships);
      this.relationships = relationships;
      this.updateGraph();
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

  ngAfterViewInit() {
    this.container = this.el.nativeElement;
  }

  updateGraph() {
    const nodes = new DataSet<any>(charactersToNodes(this.characters));
    const edges = new DataSet<any>(relationshipsToEdges(this.relationships));
    this.networkInstance = new Network(this.container, {nodes, edges}, {});
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
}
