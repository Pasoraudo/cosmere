import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';

@Component({
  selector: 'cpg-simple-layout',
  imports: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent],
  template: `
    <nz-layout>
      <nz-header>Header</nz-header>
      <nz-content><ng-content></ng-content></nz-content>
      <nz-footer>Footer</nz-footer>
    </nz-layout>
  `,
})
export class CpgSimpleLayoutComponent {
}
