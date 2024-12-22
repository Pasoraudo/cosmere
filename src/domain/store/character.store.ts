import {Injectable} from '@angular/core';
import {Character} from '../model/character';
import {isEqual} from 'lodash';
import {mergeArrays} from '../function/array.helper';
import {signalStore, withState} from '@ngrx/signals';

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
    if (isEqual(this.get().characters, characters))
      return;

    this.patchState(state => ({
      characters: mergeArrays(state.characters, characters)
    }));
  }
}
