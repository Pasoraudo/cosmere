import {
  D3Link,
  D3Node,
  D3NodeMaxScore,
  D3NodeMinScore,
  GraphEdge,
  GraphNode
} from '../../app/ui/infrastructure/vis/model/network';
import {Relationship} from '../model/relationship';
import {Character} from '../model/character';

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


export const charactersToD3Nodes = (characters: Character[], relationships: Relationship[]): D3Node[] => {
  if (characters.length === 0)
    return [];
  if (relationships.length === 0)
    return [];

  const minScore = D3NodeMinScore;
  const maxScore = D3NodeMaxScore;
  const characterScore: Record<string, number> = {};

  relationships.forEach(relationship => {
    characterScore[relationship.characterId1] ??= 0;
    characterScore[relationship.characterId2] ??= 0;

    characterScore[relationship.characterId1] += 1;
    characterScore[relationship.characterId2] += 1;
  });
  const scores = Object.values(characterScore);
  let minCharacterScore = Math.min(...scores);
  let maxCharacterScore = Math.max(...scores);
  const range = maxCharacterScore - minCharacterScore;

  const normalizedScore: Record<string, number> = {};
  for (const [key, score] of Object.entries(characterScore)) {
    normalizedScore[key] = ((score - minCharacterScore) / range) * (maxScore - minScore) + minScore;
  }

  return characters.map(character => ({
    id: character.id,
    label: character.name,
    group: character.planet,
    score: normalizedScore[character.id]
  }));
};

export const relationshipsToLinks = (relationships: Relationship[]): D3Link[] => {
  const groupedEdges: Record<string, number> = {};
  for (const relationship of relationships) {
    const key = `${relationship.characterId1}-${relationship.characterId2}`;
    if (groupedEdges[key]) {
      groupedEdges[key] += 1;
    } else {
      groupedEdges[key] = 1;
    }
  }
  let resultEdges: D3Link[] = [];

  for (const key in groupedEdges) {
    const [source, target] = key.split('-');
    const weight = groupedEdges[key];
    const group = 'undefined';
    resultEdges.push({ source, target, weight, group });
  }
  return resultEdges;
};
