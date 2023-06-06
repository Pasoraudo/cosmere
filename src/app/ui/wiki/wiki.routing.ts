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
    path: 'analysis',
    loadChildren: (): any => import('app/ui/wiki/page/analysis/analysis.module').then((m: any) => m.AnalysisModule)
  },
];
