import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BasePage} from '../../../shared/page/base.page';
import {RelationshipApi} from '../../../../../domain/service/api/relationship.api';
import {Relationship} from '../../../../../domain/model/relationship';
import {BarCharItem} from '../../../infrastructure/d3/model/barChar.model';

@Component({
  selector: 'relationship',
  templateUrl: './statistics.page.html',
  encapsulation: ViewEncapsulation.None
})
export class StatisticsPage extends BasePage implements OnInit {
  popularityData: BarCharItem[] = [];
  bookId: string = 'mistborn1'

  constructor(private relationshipApi: RelationshipApi) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.relationshipApi.relationshipsByBook(this.bookId), relationships => this.setPopularityData(relationships) )
    this.relationshipApi.fetchAllRelationship();
  }

  setPopularityData(relationships: Relationship[]): void{
    this.popularityData = this.popularityOfCharacters(relationships);
    console.log(this.popularityData);
  }

  popularityOfCharacters(relationships: Relationship[]): BarCharItem[] {
    var connectionsOfCharacters = {};
    var characters: string[] = [];
    const numRelationships: number = relationships.length;
    relationships.forEach(relationship => {
      if (!characters.includes(relationship.characterId1))
        characters.push(relationship.characterId1)
      if (!characters.includes(relationship.characterId2))
        characters.push(relationship.characterId2)
    });
    characters.forEach(character => connectionsOfCharacters[character] = 0);
    relationships.forEach(relationship => {
      connectionsOfCharacters[relationship.characterId1] += 1;
      connectionsOfCharacters[relationship.characterId2] += 1;
    });
    characters.forEach(character => connectionsOfCharacters[character] = connectionsOfCharacters[character] / numRelationships);
    const items: [string, number][] = Object.keys(connectionsOfCharacters).map(function (key) {
      return [key, connectionsOfCharacters[key]];
    });
    items.sort((item1, item2) => {
      const v1: number = +item1[1];
      const v2: number = +item2[1];
      return v2 - v1;
    });

    return items.map(item => {
      return {
        letter: item[0],
        frequency: item[1]
      }
    });
  }
}
