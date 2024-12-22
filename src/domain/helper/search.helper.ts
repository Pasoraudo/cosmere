import {Entity} from '../model/shared.model';

export const byId = <T extends Entity>(id: string, entities: T[]): T | null => entities.find(entity => entity.id === id);
