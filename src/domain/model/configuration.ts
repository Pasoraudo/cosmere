import {Entity} from './shared.model';
import {uuid} from '../helper/uuid.helper';

export interface Configuration extends Entity {
  books: string[];
}

export const defaultConfiguration = (): Configuration => {
  return {
    id: uuid(),
    books: []
  }
}

