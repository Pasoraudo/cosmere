export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface Entity {
  id: UUID;
}

export interface EntityReference {
  id: UUID;
  entity: string;
}

export const byId = <T extends Entity>(
  entities: T[],
  id: UUID,
): T | undefined => findBy(entities, "id", id);
export const filterById = <T extends Entity>(entities: T[], id: UUID): T[] =>
  filterBy(entities, "id", id);

export const findBy = <T extends Entity, K extends keyof T, V extends T[K]>(
  entities: T[],
  key: K,
  value: V,
): T | undefined => {
  return entities.find((e) => e[key] === value);
};
export const filterBy = <T extends Entity, K extends keyof T, V extends T[K]>(
  entities: T[],
  key: K,
  value: V | undefined,
): T[] => {
  return entities.filter((e) => e[key] === value);
};
