import { Routes } from '@angular/router';
import { CpgSimpleLayoutComponent } from '@app/user/layout/cpg-simple-layout.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'user',
		pathMatch: 'full',
	},
	{
		path: 'user',
		component: CpgSimpleLayoutComponent,
		loadChildren: () =>
			import('@app/user/pages/user.routes').then((m) => m.USER_ROUTES),
	},
	{
		path: '**',
		redirectTo: 'user',
	},
];
