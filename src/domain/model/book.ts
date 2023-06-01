import {Entity} from './shared.model';

export const cosmereBookIds = () => ['warbreaker', 'mistborn1', 'mistborn2', 'mistborn3', 'stormlight1'];
export interface Book extends Entity {
  title: string;

  href?: string;
}
