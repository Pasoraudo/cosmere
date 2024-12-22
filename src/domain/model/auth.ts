import {Entity} from './shared.model';
import {uuid} from '../function/uuid.helper';

export interface Auth extends Entity {
  lang: string;
}

export interface UpdateLanguage {
  id: string;
  lang: string;
}
export const defaultAuth = (): Auth => {
  return {
    id: uuid(),
    lang: 'en'
  };
}
