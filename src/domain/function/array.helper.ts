import {some, sortBy, toPairs, fromPairs} from 'lodash';

export const mergeArrays = <T>(originalArray: T[], arrayToMerge: T[]): T[] => {
  if (!originalArray)
    originalArray = [];

  let newArray = [...originalArray];

  arrayToMerge.forEach((element: T) => {
    newArray = pushOrReplace(newArray, element);
  });

  return newArray;
};

export const pushOrReplace = <T>(array: T[], entry: T): T[] => {
  const genericEntry: any = entry;
  let newArray = [...array];

  if (some(newArray, (node: any) => node.id === genericEntry.id))
    newArray = newArray.map((node: any) => (node.id === genericEntry.id) ? entry : node);
  else
    newArray.push(entry);

  return newArray;
};

export const sortMap = (map: any) => {
  return fromPairs(sortBy(toPairs(map), 1).reverse())
}
