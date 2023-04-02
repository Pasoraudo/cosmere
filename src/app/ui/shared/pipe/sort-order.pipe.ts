import {Pipe, PipeTransform} from '@angular/core';
import {isArray, orderBy} from 'lodash-es';

@Pipe({name: 'sortOrder'})
export class SortOrderPipe implements PipeTransform {
  constructor() {
  }

  transform(values: any[]): any[] {
    if (!isArray(values))
      return [];

    return orderBy(values, ['order'], ['asc']);
  }


}
