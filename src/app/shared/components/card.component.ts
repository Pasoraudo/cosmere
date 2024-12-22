import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-card',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container>
      <ng-content></ng-content>
    </ng-container>
  `,
  styles: [`
    app-card {
      position: relative;
      display: flex;
      overflow: hidden;
      border: 1px solid #FF9500;
      background: #0C0C0C;
      @apply rounded-2xl shadow;
    }
  `]
})
export class CardComponent {

  constructor() {
  }
}
