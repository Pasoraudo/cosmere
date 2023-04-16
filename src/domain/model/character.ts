export interface Character {
  id: string;

  name: string;

  href?: string;

  bookIds: string[];

  planet?: string;

  description?: string;
}
