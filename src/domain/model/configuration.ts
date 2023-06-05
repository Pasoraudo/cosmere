import {Entity} from './shared.model';
import {uuid} from '../function/uuid.helper';

export interface Configuration extends Entity {
  books: string[];
}

export const newConfiguration = (): Configuration => {
  return {
    id: uuid(),
    books: []
  }
}
