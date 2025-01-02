import {SafeAny} from './any.helper';

export const log = (message?: SafeAny, ...params: SafeAny[]): void => {
  console.log(message, ...params);
};
