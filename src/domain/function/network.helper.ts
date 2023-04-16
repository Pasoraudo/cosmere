import {GraphEdge, GraphNode} from '../model/network';
import {Relationship} from '../model/relationship';

export const charactersToNodes = (characters): GraphNode[] => {
  return characters.map(character => ({
    id: character.id,
    label: character.name,
    group: character.planet
  }));
};

export const relationshipsToEdges = (relationships: Relationship[]): GraphEdge[] => {
  return relationships.map(relationship => ({
    from: relationship.characterId1,
    to: relationship.characterId2
  }));
};
