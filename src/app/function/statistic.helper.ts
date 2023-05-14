import {Relationship} from '../../domain/model/relationship';
import {BarCharItem} from '../ui/infrastructure/d3/model/barChar.model';

export function popularityOfCharacters(relationships: Relationship[]): BarCharItem[] {
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
  //characters.forEach(character => connectionsOfCharacters[character] = connectionsOfCharacters[character] / numRelationships);
  const popularityOfCharacters: [string, number][] = Object.keys(connectionsOfCharacters).map(function (key) {
    return [key, connectionsOfCharacters[key]];
  });
  popularityOfCharacters.sort((item1, item2) => {
    const v1: number = +item1[1];
    const v2: number = +item2[1];
    return v2 - v1;
  });

  return popularityOfCharacters.map(item => {
    return {
      label: item[0],
      value: item[1]
    }
  });
}
