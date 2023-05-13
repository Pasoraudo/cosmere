import {Injectable} from '@angular/core';
import {ApiClient} from '../network/api.client';
import {map, Observable} from 'rxjs';
import {RelationshipStore} from '../../store/relationship.store';
import {Relationship} from '../../model/relationship';

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

  syncAllRelationship(): Relationship[] {
    return this.store.syncState().relationships;
  }

  allRelationship(): Observable<Relationship[]> {
    return this.store.relationships$;
  }

  relationshipsByBook(bookId): Observable<Relationship[]> {
    return this.store.relationships$.pipe(
      map(relationships => relationships.filter(relationship => relationship?.bookId === bookId))
    );
  }
}
