import {Entity} from './shared.model';

export interface Character extends Entity {
  name: string;
  href?: string;
  bookIds: string[];
  planet?: string;
  description?: string;
  universe: string;
  ethnicity?: string;
}

export const equalCharacters = (character1: Character, character2: Character): boolean => character1.id === character2.id;
