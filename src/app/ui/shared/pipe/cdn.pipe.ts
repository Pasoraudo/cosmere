import {Pipe, PipeTransform} from '@angular/core';
import {environment} from 'environments/environment';

@Pipe({name: 'cdn'})
export class CdnPipe implements PipeTransform {

  constructor() {
  }

  transform(src: string): string {
    if (!src)
      return '';

    if (!src.startsWith('/'))
      src = '/' + src;

    return environment.cdnHost + src;
  }
}
