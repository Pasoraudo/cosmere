import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {BasePage} from '../../../shared/page/base.page';
import {CharacterApi} from '../../../../../domain/service/api/character.api';
import {Character} from '../../../../../domain/model/character';
import {Relationship} from '../../../../../domain/model/relationship';
import {GraphEdge, GraphNode} from '../../../../../domain/model/network';
import {charactersToNodes} from '../../../../../domain/function/network.helper';

@Component({
    selector     : 'relationship',
    templateUrl  : './relationship.page.html',
    encapsulation: ViewEncapsulation.None
})
export class RelationshipPage extends BasePage implements OnInit
{
    constructor() {
      super();
    }

  ngOnInit(): void {

  }


}
