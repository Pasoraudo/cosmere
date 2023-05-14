import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BasePage} from '../../../shared/page/base.page';
import {RelationshipApi} from '../../../../../domain/service/api/relationship.api';
import {Relationship} from '../../../../../domain/model/relationship';
import {BarCharItem} from '../../../infrastructure/d3/model/barChar.model';
import {connectionsOfCharactersFromRelationships} from '../../../../function/statistic.helper';

@Component({
  selector: 'relationship',
  templateUrl: './statistics.page.html',
  encapsulation: ViewEncapsulation.None
})
export class StatisticsPage extends BasePage implements OnInit {
  popularityData: BarCharItem[] = [];
  bookId: string = 'mistborn1';

  constructor(private relationshipApi: RelationshipApi) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.relationshipApi.relationshipsByBook(this.bookId), relationships => this.setPopularityData(relationships) )
    this.relationshipApi.fetchAllRelationship();
  }

  setPopularityData(relationships: Relationship[]): void {
    this.popularityData = connectionsOfCharactersFromRelationships(relationships);
  }
}
