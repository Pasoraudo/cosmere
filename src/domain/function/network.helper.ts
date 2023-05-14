import {GraphEdge, GraphNode} from '../../app/ui/infrastructure/vis/model/network';
import {Relationship} from '../model/relationship';

export const charactersToNodes = (characters): GraphNode[] => {
  return characters.map(character => ({
    id: character.id,
    label: character.name,
    group: character.planet
  }));
};

export const relationshipsToEdges = (relationships: Relationship[]): GraphEdge[] => {
  const groupedEdges: Record<string, number> = {};
  for (const relationship of relationships) {
    const key = `${relationship.characterId1}-${relationship.characterId2}`;
    if (groupedEdges[key]) {
      groupedEdges[key] += 1;
    } else {
      groupedEdges[key] = 1;
    }
  }
  let resultEdges: GraphEdge[] = [];

  for (const key in groupedEdges) {
    const [from, to] = key.split('-');
    const value = groupedEdges[key];
    resultEdges.push({ from, to, value });
  }
  return resultEdges;
};
