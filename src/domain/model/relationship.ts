import {Entity} from './shared.model';

type RelationshipType = '';
export interface Relationship extends Entity {

  characterId1: string;

  characterId2: string;

  type: RelationshipType;

  bookId: string;
}
