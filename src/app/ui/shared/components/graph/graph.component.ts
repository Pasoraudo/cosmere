import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataSet, Network} from 'vis';
import {BaseComponent} from '../base.component';
import {Character} from '../../../../../domain/model/character';
import {Relationship} from '../../../../../domain/model/relationship';
import {charactersToNodes, relationshipsToEdges} from '../../../../../domain/function/network.helper';
import {CharacterApi} from '../../../../../domain/service/api/character.api';
import {RelationshipApi} from '../../../../../domain/service/api/relationship.api';
import {defer} from 'lodash';

@Component({
  selector: 'characters-relationships-graph',
  template: '<div #network></div>'
})
export class GraphComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('network') el: ElementRef;

  networkInstance: any;
  container: any;
  characters: Character[];
  relationships: Relationship[];

  constructor(private characterApi: CharacterApi, private relationshipApi: RelationshipApi) {
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
  }

  ngAfterViewInit() {
    this.container = this.el.nativeElement;
  }

  updateGraph() {
    const nodes = new DataSet<any>(charactersToNodes(this.characters));
    const edges = new DataSet<any>(relationshipsToEdges(this.relationships));
    this.networkInstance = new Network(this.container, {nodes, edges}, {});
  }
}
