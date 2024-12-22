import {v4 as uuidv4} from 'uuid';
import {random} from 'lodash-es';

export const uuid = (): string => uuidv4();
export const password = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPWRSTUVWXYZ0123456789!@#$%^&*-_=+|:;,.<>/?A';
  let pass = '';
  for (let i = 0; i < 12; i++) {
    const index = random(0, chars.length);
    pass += chars.substring(index, index + 1);
  }

  return pass;


};
