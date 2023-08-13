import {Entity} from './shared.model';

export interface Saga extends Entity {
  title: string;
  bookIds: string[];
}
