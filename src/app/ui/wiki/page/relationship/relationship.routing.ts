import {Route} from '@angular/router';
import {HomePage} from 'app/ui/wiki/page/home/home.page';
import {RelationshipPage} from './relationship.page';

export const relationshipRouting: Route[] = [
  {
    path: '',
    redirectTo: 'relationship',
    pathMatch: 'full',
  },
  {
    path: 'relationship',
    component: RelationshipPage,
  },
];
