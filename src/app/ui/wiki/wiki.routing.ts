import {Route} from '@angular/router';
import {HomeModule} from './page/home/home.module';
import {NetworkModule} from './page/network/network.module';
import {AnalysisModule} from './page/analysis/analysis.module';

export const wikiRouting: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: (): any => HomeModule
  },
  {
    path: 'network',
    loadChildren: (): any => NetworkModule
  },
  {
    path: 'analysis',
    loadChildren: (): any => AnalysisModule
  },
];
