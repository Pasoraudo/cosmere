import {Entity} from './shared.model';

export interface Guide extends Entity {
  name: string;
  order: GuideRelationship[];
  description?: string;
}

export type GuideRelationshipType = "highly_recommended" | "recommended" | "not_recommended" | "optional" | "start";
export const guideRelationshipTypes = (): GuideRelationshipType[] => ["highly_recommended", "recommended", "not_recommended", "optional"];

export interface GuideRelationship extends Entity {
  sourceId: string;
  targetId: string;
  type: GuideRelationshipType;
  observation?: string;
}

export const equalGuides = (guide1: Guide, guide2: Guide) => guide1.id === guide2.id;
