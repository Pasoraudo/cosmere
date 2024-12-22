import {Injectable, Signal} from '@angular/core';
import {Character} from '../../model/character';
import {ApiClient} from '../network/api.client';
import {CharacterStore} from '../../store/character.store';

@Injectable({
  providedIn: 'root',
})
export class CharacterApi {

  constructor(private readonly api: ApiClient, private readonly store: CharacterStore) {
  }

  async fetchAllCharacter(): Promise<void> {
    const httpCharacters = await this.api.get('characters') as Character[];
    this.store.saveAllCharacters(httpCharacters);
  }

  async fetchAllCosmereCharacter(): Promise<void> {
    const httpCharacters = await this.api.get('characters') as Character[];
    const cosmereCharacters = httpCharacters.filter(character => character.universe === 'Cosmere');
    this.store.saveAllCharacters(cosmereCharacters);
  }

  allCharacters(): Signal<Character[]> {
    return this.store.characters;
  }
}
