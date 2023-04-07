import {Injectable} from '@angular/core';
import {Character} from '../../model/character';
import {ApiClient} from '../network/api.client';
import {CharacterStore} from '../../store/character.store';
import {Observable} from 'rxjs';

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

  syncAllCharacters(): Character[] {
    return this.store.syncState().characters;
  }

  allCharacters(): Observable<Character[]> {
    return this.store.characters$;
  }
}
