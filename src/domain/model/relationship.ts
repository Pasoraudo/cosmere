type RelationshipType = '';
export interface Relationship {

  id: string;

  characterId1: string;

  characterId2: string;

  type: RelationshipType;

  bookId: string;
}
