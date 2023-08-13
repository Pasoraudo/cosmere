import {Injectable} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';
import {AuthApi} from '../api/auth.api';

const staticTranslator: { trans: Translator | null } = {trans: null};

@Injectable({
  providedIn: 'root',
})
export class Translator {

  constructor(private translator: TranslocoService, private authApi: AuthApi) {
    staticTranslator.trans = this;
  }

  public trans(key: string, params?: object, lang?: string): string {
    if (!lang) {
      lang = this.authApi.syncMe()?.lang;
    }
    if (!lang) {
      lang = this.translator.getDefaultLang();
    }
    return this.translator.translate(key, params, lang);
  }
}

export const trans = (key: string, params?: object, lang?: string): string => staticTranslator.trans.trans(key, params, lang);

