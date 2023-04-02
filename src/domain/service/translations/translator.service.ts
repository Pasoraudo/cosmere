import {Injectable} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';

const staticTranslator: { trans: Translator | null } = {trans: null};

@Injectable({
  providedIn: 'root',
})
export class Translator {
  constructor(private translator: TranslocoService) {
    staticTranslator.trans = this;
  }

  public trans(key: string, params?: object): string {
    return this.translator.translate(key, params, 'es');
  }

}

export const trans = (key: string, params?: object): string => staticTranslator.trans.trans(key, params);

