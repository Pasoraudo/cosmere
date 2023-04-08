import {GraphEdge, GraphNode} from '../model/network';

export const charactersToNodes = (characters): GraphNode[] => {
  return characters.map(character => {
    return {
      id: character.id,
      label: character.name,
      group: character.planet
    }
  });
};

export const relationshipsToEdges = (relationships): GraphEdge[] => {
  return relationships.map(relationship => {
    return {
      from: relationship.characterId1,
      to: relationship.characterId2
    }
  });
};
