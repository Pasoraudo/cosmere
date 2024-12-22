import {sortMap} from '../../../../../domain/function/array.helper';
import * as _ from 'lodash';

export interface BarChartItem {
  label: string;
  value: number;
}

export const arrayToBarChartItemArray = (array: Array<[string, number]>): BarChartItem[] => {
  return array.map(([label, value]) => {
    return ({
      label: label,
      value: value,
    });
  });
}

export const mapToBarChartItemArray = (map): BarChartItem[] => {
  return arrayToBarChartItemArray(_.map(sortMap(map), (valor: number, clave) => [clave, valor]))
}

export const normalizeBarChartItems = (items: BarChartItem[]): BarChartItem[] => {
  const min = Math.min(...items.map(item => item.value));
  const max = Math.max(...items.map(item => item.value));

  return items.map(item => ({
    ...item,
    value: (item.value - min) / (max - min)
  }));
}
