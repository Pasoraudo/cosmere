import {Component} from '@angular/core';
import {NzContentComponent, NzFooterComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {BaseComponent} from '@app/shared/components/base.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'cpg-simple-layout',
  imports: [NzLayoutComponent, NzContentComponent, NzFooterComponent, RouterOutlet],
  template: `
    <nz-layout class="layout-wrapper">
      <nz-content class="content">
        <router-outlet class="content-router"></router-outlet>
      </nz-content>
      <nz-footer class="footer">
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
  styles: [`
    .layout-wrapper {
      min-height: 100vh; /* Altura mínima de toda la ventana */
      display: flex;
      flex-direction: column; /* Organiza en columna */
    }

    .content {
      flex: 1; /* Ocupa el espacio restante dinámicamente */
    }

    .footer {
      /* Sin altura fija: usa el tamaño del contenido del footer */
    }
  `]
})
export class CpgSimpleLayoutComponent extends BaseComponent {
  year = new Date().getFullYear();
}
