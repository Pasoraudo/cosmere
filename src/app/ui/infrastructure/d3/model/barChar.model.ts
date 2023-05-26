import _ from 'lodash';
import {sortMap} from '../../../../../domain/function/array.helper';

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
