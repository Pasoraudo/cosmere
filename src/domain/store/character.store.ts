import {Injectable} from '@angular/core';
import {Character, equalCharacters} from '../model/character';
import {isEqual} from 'lodash';
import {patchState, signalStore, withState} from '@ngrx/signals';
import {mergeArrays} from '@helper/array.helper';

export interface CharacterState {
  characters: Character[];
}

const emptyState = (): CharacterState => ({
  characters: []
});

@Injectable({
  providedIn: 'root',
})
export class CharacterStore extends signalStore(
  {protectedState: false},
  withState<CharacterState>(emptyState()),
) {

  saveAllCharacters(characters: Character[]): void {
    const actualCharacters = this.characters();
    if (isEqual(actualCharacters, characters))
      return;

    patchState(this, {
      characters: mergeArrays(actualCharacters, characters, equalCharacters)
    });
  }
}
