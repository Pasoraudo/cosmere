import {Entity} from './shared.model';

export const cosmerePlanets = () => ['Roshar', 'Yolen', 'Scadrial', 'Nalthis'];

export interface Planet extends Entity {
  name: string;
  href?: string;
}

export const equalPlanets = (planet1: Planet, planet2: Planet): boolean => planet1.id === planet2.id;
