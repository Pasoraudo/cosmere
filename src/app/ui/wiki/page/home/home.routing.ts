import {Route} from '@angular/router';
import {HomePage} from 'app/ui/wiki/page/home/home.page';

export const homeRouting: Route[] = [
  {
    path: '',
    component: HomePage,
  },
];
