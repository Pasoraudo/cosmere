import {Entity} from './shared.model';

export const cosmereBookIds = () => ['warbreaker', 'mistborn1', 'mistborn2', 'mistborn3', 'mistborn4', 'mistborn5', 'mistborn6'
  , 'stormlight1', 'stormlight2', 'stormlight3', 'stormlight4'];

export interface Book extends Entity {
  title: string;
  href?: string;
}

export const equalBooks = (book1: Book, book2: Book): boolean => book1.id === book2.id;
