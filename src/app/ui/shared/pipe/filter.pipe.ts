import {Pipe, PipeTransform} from '@angular/core';
import {isArray, orderBy} from 'lodash-es';

@Pipe({name: 'sortName'})
export class SortNamePipe implements PipeTransform {
  constructor() {
  }

  transform(values: any[]): any[] {
    if (!isArray(values))
      return [];

    return orderBy(values, ['name'], ['asc']);
  }


}

@Pipe({name: 'sortDescription'})
export class SortDescriptionPipe implements PipeTransform {
  constructor() {
  }

  transform(values: any[]): any[] {
    if (!isArray(values))
      return [];

    return orderBy(values, ['description'], ['asc']);
  }


}

