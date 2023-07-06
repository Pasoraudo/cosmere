import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NavigationItem} from '../../wiki-navigation';

@Component({
  selector: 'app-horizontal-navigation-basic-item',
  templateUrl: './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalNavigationBasicItemComponent {
  @Input() item: NavigationItem;

  constructor() {
  }
}
