import {Injectable} from '@angular/core';
import {Character} from '../../model/character';
import {ApiClient} from '../network/api.client';
import {CharacterStore} from '../../store/character.store';
import {map, Observable} from 'rxjs';
import {cosmereBookIds} from '../../model/book';
import {intersection} from 'lodash-es';
import {cosmerePlanets} from '../../model/planet';

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
    const cosmereCharacters = httpCharacters.filter(character => cosmerePlanets().includes(character.planet))
    this.store.saveAllCharacters(cosmereCharacters);
  }

  syncAllCharacters(): Character[] {
    return this.store.syncState().characters;
  }

  allCharacters(): Observable<Character[]> {
    return this.store.characters$;
  }

  cosmereCharacters(): Observable<Character[]> {
    return this.store.characters$.pipe(map(characters =>
      characters.filter(character => cosmerePlanets().includes(character.planet))
    ));
  }
}
