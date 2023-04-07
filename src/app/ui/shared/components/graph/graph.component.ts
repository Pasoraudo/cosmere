import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataSet, Network} from 'vis';
import {CharacterApi} from '../../../../../domain/service/api/character.api';
import {BaseComponent} from '../base.component';
import {Character} from '../../../../../domain/model/character';

@Component({
    selector     : 'graph',
    template: '<div #network></div>'
})
export class GraphComponent extends BaseComponent implements OnInit, AfterViewInit
{
  @ViewChild('network') el: ElementRef;
  private networkInstance: any;

  container: any;
  characters: Character[];
  constructor(private characterApi: CharacterApi) {
    super();
  }

  async ngOnInit() {
    await this.characterApi.fetchAllCharacters();
    this.subscribe(this.characterApi.allCharacters(), characters => {
      this.characters = characters;
      this.updateGraph();
    });
  }

  ngAfterViewInit() {
    this.container = this.el.nativeElement;
  }

  updateGraph() {
    const nodes = new DataSet<any>(this.characters);
    const edges = new DataSet<any>([
      {from: 1, to: 3},
      {from: 1, to: 2},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]);
    this.networkInstance = new Network(this.container, {nodes, edges}, {});

  }
}
