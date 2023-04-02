import { Route } from '@angular/router';
import { HomeComponent } from 'app/ui/wiki/home/home.component';

export const wikiRoutes: Route[] = [
    {
        path     : '',
        component: HomeComponent
    }
];
