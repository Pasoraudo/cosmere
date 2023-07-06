import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseComponent} from './base.component';


@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <div class="fuse-card-front">
        <ng-content select="[fuseCardFront]"></ng-content>
      </div>
    </ng-container>
  `,
})
export class CardComponent extends BaseComponent {

}
