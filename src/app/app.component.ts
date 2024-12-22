import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseComponent } from './shared/components/base.component';
import { CpgSimpleLayoutComponent } from './user/layout/cpg-simple-layout.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, CpgSimpleLayoutComponent],
	template: `
    <div>
      <cpg-simple-layout/>
      <router-outlet/>
    </div>
  `,
})
export class AppComponent extends BaseComponent {}
