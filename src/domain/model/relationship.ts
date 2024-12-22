import {Entity} from './shared.model';

type RelationshipType = '';

export interface Relationship extends Entity {

  characterId1: string;

  characterId2: string;

  type: RelationshipType;

  bookId: string;
}

export const equalRelationships = (relationship1: Relationship, relationship2: Relationship): boolean => relationship1.id === relationship2.id;
