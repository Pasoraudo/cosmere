import {Entity} from './shared.model';

export interface Character extends Entity {

  name: string;

  href?: string;

  bookIds: string[];

  planet?: string;

  description?: string;
}
