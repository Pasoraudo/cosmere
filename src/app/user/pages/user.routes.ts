import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
	{
		path: '',
		redirectTo: 'guide',
		pathMatch: 'full',
	},
	{
		path: 'guide',
		loadChildren: () =>
			import('./guide/guide.routes').then((m) => m.GUIDE_ROUTES),
	},
];
