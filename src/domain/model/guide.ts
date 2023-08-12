import {Entity} from './shared.model';

export interface Guide extends Entity {
  name: string;
  order: GuideRelationship[];
  description?: string;
}

export type GuideRelationshipType = "obligatory" | "highly_recommended" | "recommended" | "not_recommended" | "optional" | "";
export interface GuideRelationship extends Entity {
  sourceId: string;
  targetId: string;
  type: GuideRelationshipType;
  observation?: string;
}
