import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {isEqual} from 'lodash';
import {mergeArrays} from '../function/array.helper';
import {Relationship} from '../model/relationship';

export interface RelationshipState {
  relationships: Relationship[];
}
const emptyState = (): RelationshipState => ({
  relationships: []
});
@Injectable({
  providedIn: 'root',
})
export class RelationshipStore extends ComponentStore<RelationshipState> {

  public readonly relationships$ = this.select(state => state.relationships);

  constructor() {
    super(emptyState());
  }

  saveAllRelationship(relationships: Relationship[]): void {
    if (isEqual(this.get().relationships, relationships))
      return;
    this.patchState(state => ({
      relationships: mergeArrays(state.relationships, relationships)
    }));
  }

  syncState(): RelationshipState {
    return this.get();
  }

  reset(): void {
    this.patchState(emptyState());
  }
}
