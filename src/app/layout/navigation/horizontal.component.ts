import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {NavigationItem} from './wiki-navigation';

@Component({
  selector: 'app-horizontal-navigation',
  templateUrl: './horizontal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'fuseHorizontalNavigation'
})
export class HorizontalNavigationComponent {

  @Input()
  navigation: NavigationItem[] = [];

  constructor() {
  }
}
