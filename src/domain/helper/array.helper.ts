import {isNil, map, property, some} from "lodash-es";
import {Entity} from '@model/shared.model';

export const mergeArrays = <T>(
  originalArray: T[],
  arrayToMerge: T[],
  equalsFn: (entity1: T, entity2: T) => boolean,
): T[] => {
  if (!originalArray) originalArray = [];
  if (!Array.isArray(arrayToMerge)) return originalArray;

  let newArray = [...originalArray];
  arrayToMerge.forEach((element: T) => {
    newArray = pushOrReplace(newArray, element, equalsFn);
  });

  return newArray;
};

export const pushOrReplace = <T>(
  array: T[],
  entry: T,
  equalsFn: (entity1: T, entity2: T) => boolean,
): T[] => {
  if (isNil(entry)) return array;
  const genericEntry: T = entry;
  let newArray = [...array];

  if (some(newArray, (node: T) => equalsFn(node, genericEntry)))
    newArray = newArray.map((node: T) =>
      equalsFn(node, genericEntry) ? entry : node,
    );
  else newArray.push(entry);

  return newArray;
};

export const mergeEntityArrays = <T extends Entity>(
  originalArray: T[],
  arrayToMerge: T[],
): T[] => {
  if (!originalArray) originalArray = [];
  if (!Array.isArray(arrayToMerge)) return originalArray;

  let newArray = [...originalArray];
  arrayToMerge.forEach((element: T) => {
    newArray = pushOrReplaceEntity(newArray, element);
  });

  return newArray;
};

export const pushOrReplaceEntity = <T extends Entity>(
  array: T[],
  entry: T,
): T[] => {
  if (isNil(entry)) return array;
  const genericEntry: T = entry;
  let newArray = [...array];

  if (some(newArray, (node: T) => node.id === genericEntry.id))
    newArray = newArray.map((node: T) =>
      node.id === genericEntry.id ? entry : node,
    );
  else newArray.push(entry);

  return newArray;
};

export const removeIfExist = <T extends Entity>(array: T[], entry: T): T[] => {
  if (isNil(entry)) return array;
  const genericEntry: T = entry;
  let newArray = [...array];

  if (some(newArray, (node: T) => node.id === genericEntry.id))
    newArray = newArray.filter((node: T) => node.id !== genericEntry.id);

  return newArray;
};

export const mapBy = <T, K extends keyof T>(array: T[], key: K): T[K][] =>
  map(array, property(key));
