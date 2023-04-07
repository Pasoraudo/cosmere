import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {Character} from '../model/character';
import {byId} from '../function/search.helper';
import {isEqual} from 'lodash';
import {mergeArrays} from '../function/array.helper';

export interface CharacterState {
  characters: Character[];
}

const emptyState = (): CharacterState => ({
  characters: []
});

@Injectable({
  providedIn: 'root',
})
export class CharacterStore extends ComponentStore<CharacterState> {

  public readonly characters$ = this.select(state => state.characters);

  constructor() {
    super(emptyState());
  }

  saveAllCharacters(characters: Character[]): void {
    if (isEqual(this.get().characters, characters))
      return;

    this.patchState(state => ({
      characters: mergeArrays(state.characters, characters)
    }));
  }

  syncState(): CharacterState {
    return this.get();
  }

  syncCharacter(characterId: string): Character | null {
    return byId(characterId, this.get().characters);
  }

  reset(): void {
    this.patchState(emptyState());
  }
}
