import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseComponent} from './base.component';
import {ThemePalette} from '@angular/material/core';
import {color} from 'd3-color';


@Component({
  selector: 'app-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<!--    <mat-icon [color]="color" [ngClass]="'icon-size-'+size" [svgIcon]="svg()"></mat-icon>-->
  `,
})
export class NavigationComponent extends BaseComponent {

}
