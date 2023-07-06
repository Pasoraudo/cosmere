import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseComponent} from './base.component';


@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--    <mat-icon [color]="color" [ngClass]="'icon-size-'+size" [svgIcon]="svg()"></mat-icon>-->
  `,
})
export class CardComponent extends BaseComponent {

}
