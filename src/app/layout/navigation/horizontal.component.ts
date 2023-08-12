import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {NavigationItem} from './wiki-navigation';

@Component({
  selector: 'app-horizontal-navigation',
  templateUrl: './horizontal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'fuseHorizontalNavigation',
  styles: [`
    .container {
      display: flex;
    }
    .container > div:first-child {
      margin-right: auto;
      visibility: hidden;
    }
    .container > div:last-child {
      margin-left: auto;
    }
  `]
})
export class HorizontalNavigationComponent {

  @Input()
  navigation: NavigationItem[] = [];

  constructor() {
  }
}
