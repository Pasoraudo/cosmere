import {Component} from "@angular/core";
import {NzContentComponent, NzFooterComponent, NzLayoutComponent,} from "ng-zorro-antd/layout";
import {BaseComponent} from "@app/shared/components/base.component";
import {RouterOutlet} from "@angular/router";

@Component({
	selector: "cpg-simple-layout",
	imports: [
		NzLayoutComponent,
		NzContentComponent,
		NzFooterComponent,
		RouterOutlet,
	],
	template: `
    <nz-layout class="flex h-full w-full overflow-hidden">
      <nz-content>
        <router-outlet/>
      </nz-content>
      <nz-footer>
        <div class="flex justify-center">
          <div class="flex flex-col w-fit text-center">
            <p>
              Open Source Project by
              <a href="https://github.com/Pasoraudo" target="_blank" rel="noopener noreferrer">Pasoraudo</a>
            </p>
            <p>© {{ year }} All Rights Reserved.</p>
          </div>
        </div>
      </nz-footer>
    </nz-layout>
  `,
})
export class CpgSimpleLayoutComponent extends BaseComponent {
	year = new Date().getFullYear();
}
