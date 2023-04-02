import {Pipe, PipeTransform} from '@angular/core';
import {Translator} from 'domain/service/translations/translator.service';

@Pipe({name: 'trans'})
export class TranslatorPipe implements PipeTransform {

  constructor(private readonly translator: Translator) {
  }

  transform(key: string): string {
    return this.translator.trans(key);
  }


}
