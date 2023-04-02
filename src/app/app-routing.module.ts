import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {CanDeactivateGuard} from '../domain/ionic/can-deactivate';
import {LayoutComponent} from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: LayoutComponent,
    loadChildren: () => import('./ui/wiki/wiki.module').then(m => m.WikiModule)
  },
];

@NgModule({
  providers: [
    CanDeactivateGuard
  ],
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
