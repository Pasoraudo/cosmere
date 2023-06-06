import {Route} from '@angular/router';

export const wikiRouting: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: (): any => import('app/ui/wiki/page/home/home.module').then((m: any) => m.HomeModule)
  },
  {
    path: 'network',
    loadChildren: (): any => import('app/ui/wiki/page/network/network.module').then((m: any) => m.NetworkModule)
  },
  {
    path: 'statistics',
    loadChildren: (): any => import('app/ui/wiki/page/statistics/statistics.module').then((m: any) => m.StatisticsModule)
  },
];
