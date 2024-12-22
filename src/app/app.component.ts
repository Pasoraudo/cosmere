import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {BaseComponent} from './shared/components/base.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="mt-16">
      <router-outlet/>
    </div>
  `,
})
export class AppComponent extends BaseComponent {
}
