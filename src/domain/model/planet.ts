import {Entity} from './shared.model';

export const cosmerePlanets = () => ['Roshar', 'Yolen', 'Scadrial', 'Nalthis'];
export interface Planet extends Entity {
  name: string;

  href?: string;
}
