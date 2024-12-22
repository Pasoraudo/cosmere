import {Component} from '@angular/core';
import {NzContentComponent, NzFooterComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {BaseComponent} from '@app/shared/components/base.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'cpg-simple-layout',
  imports: [NzLayoutComponent, NzContentComponent, NzFooterComponent, RouterOutlet],
  template: `
    <nz-layout>
      <!--  TODO    <nz-header>Header</nz-header>-->
      <nz-content>
        <router-outlet></router-outlet>
      </nz-content>
      <nz-footer>
        <div style="text-align: center;">
          <p>
            Open Source Project by
            <a href="https://github.com/Pasoraudo" target="_blank" rel="noopener noreferrer">Pasoraudo</a>
          </p>
          <p>© {{ year }} All Rights Reserved.</p>
        </div>
      </nz-footer>
    </nz-layout>
  `,
})
export class CpgSimpleLayoutComponent extends BaseComponent {
  year = new Date().getFullYear();
}
