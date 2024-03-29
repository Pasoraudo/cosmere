import {Injectable} from '@angular/core';
import {ApiClient} from '../network/api.client';
import {map, Observable} from 'rxjs';
import {RelationshipStore} from '../../store/relationship.store';
import {Relationship} from '../../model/relationship';
import {cosmereBookIds} from '../../model/book';
import {mergeArrays} from '../../function/array.helper';

@Injectable({
  providedIn: 'root',
})
export class RelationshipApi {

  constructor(private readonly api: ApiClient, private readonly store: RelationshipStore) {
  }

  async fetchAllRelationship(): Promise<void> {
    const httpRelationship = await this.api.get('relationships') as Relationship[];
    this.store.saveAllRelationship(httpRelationship);
  }

  async fetchAllRelationshipByBookId(bookId: string): Promise<void> {
    const httpRelationship = await this.api.get('relationships-' + bookId) as Relationship[];
    this.store.saveAllRelationship(httpRelationship);
  }

  async fetchAllCosmereRelationship(): Promise<void> {
    const promises = [];
    for (const bookId of cosmereBookIds()) {
      promises.push(
        this.api
          .get('relationships-' + bookId)
          .then((response) => response as Relationship[])
          .catch((error) => {
          })
      );
    }
    const relationships = await Promise.all(promises) as Relationship[][];
    let relationshipsMerged = [];
    relationships.forEach(relationship => relationshipsMerged = mergeArrays(relationshipsMerged, relationship))
    this.store.saveAllRelationship(relationshipsMerged);
  }

  syncAllRelationship(): Relationship[] {
    return this.store.syncState().relationships;
  }

  allRelationship(): Observable<Relationship[]> {
    return this.store.relationships$;
  }

  cosmereRelationships(): Observable<Relationship[]> {
    return this.store.relationships$.pipe(map(relationships =>
      relationships.filter(relationship => cosmereBookIds().includes(relationship.bookId))
    ));
  }

  relationshipsByBook(bookId: string): Observable<Relationship[]> {
    return this.store.relationships$.pipe(
      map(relationships => relationships.filter(relationship => relationship?.bookId === bookId))
    );
  }
}
