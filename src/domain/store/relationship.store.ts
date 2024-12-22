import {Injectable} from '@angular/core';
import {isEqual} from 'lodash';
import {equalRelationships, Relationship} from '../model/relationship';
import {patchState, signalStore, withState} from '@ngrx/signals';
import {mergeArrays} from '../helper/array.helper';

export interface RelationshipState {
  relationships: Relationship[];
}

const emptyState = (): RelationshipState => ({
  relationships: []
});

@Injectable({
  providedIn: 'root',
})
export class RelationshipStore extends signalStore(
  {protectedState: false},
  withState<RelationshipState>(emptyState()),
) {

  saveAllRelationship(relationships: Relationship[]): void {
    if (isEqual(this.relationships(), relationships))
      return;
    patchState(this, {
      relationships: mergeArrays(this.relationships(), relationships, equalRelationships)
    });
  }
}
