import {Entity} from './shared.model';

export interface Saga extends Entity {
  title: string;
  bookIds: string[];
}

export const equalSagas = (saga1: Saga, saga2: Saga): boolean => saga1.id === saga2.id;
