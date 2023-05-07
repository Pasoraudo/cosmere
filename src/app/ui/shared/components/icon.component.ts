import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseComponent} from './base.component';


@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-icon [color]="iconColor()" [ngClass]="'icon-size-'+size" [svgIcon]="svg()"></mat-icon>
  `,
})
export class IconComponent extends BaseComponent {
  @Input() color: 'none' | 'primary' | 'bold' | 'warning' = 'none';
  @Input() size: '1' | '2' | '3' | '4' | '5' | '8' | '10';
  @Input() icon: 'book-open' | 'clone' | 'exclamation' | 'add-user' | 'info' | 'add' | 'trash' | 'upload' | 'document' | 'refresh'
    | 'eye' | 'check' | 'check-circle' | 'x' | 'search' | 'search-solid' | 'edit' | 'cart' | 'create' | 'create-solid' | 'save' | 'user-circle' | 'question-mark-circle'
    | 'remove-circle-outline' | 'ban' | 'clipboard-check' | 'pencil-alt' | 'duplicate' | 'folder' | 'clipboard-list' | 'lock-closed' | 'calendar';

  constructor() {
    super();
  }

  svg(): string {
    if (this.icon === 'exclamation')
      return 'heroicons_outline:exclamation';

    if (this.icon === 'add-user')
      return 'heroicons_solid:user-add';

    if (this.icon === 'refresh')
      return 'heroicons_outline:refresh';

    if (this.icon === 'save')
      return 'heroicons_outline:save';

    if (this.icon === 'add')
      return 'heroicons_outline:plus';

    if (this.icon === 'create')
      return 'heroicons_outline:plus-circle';

    if (this.icon === 'create-solid')
      return 'heroicons_solid:plus-circle';

    if (this.icon === 'cart')
      return 'heroicons_outline:shopping-cart';

    if (this.icon === 'search-solid')
      return 'heroicons_solid:search-circle';

    if (this.icon === 'edit')
      return 'heroicons_outline:pencil-alt';

    if (this.icon === 'search')
      return 'heroicons_outline:search-circle';

    if (this.icon === 'info')
      return 'heroicons_outline:information-circle';

    if (this.icon === 'check')
      return 'heroicons_solid:check';

    if (this.icon === 'check-circle')
      return 'checkmark-circle-outline';

    if (this.icon === 'x')
      return 'heroicons_solid:x';

    if (this.icon === 'eye')
      return 'heroicons_outline:eye';

    if (this.icon === 'document')
      return 'heroicons_outline:document';

    if (this.icon === 'trash')
      return 'heroicons_outline:trash';

    if (this.icon === 'upload')
      return 'heroicons_outline:upload';

    if (this.icon === 'book-open')
      return 'heroicons_solid:book-open';

    if (this.icon === 'clone')
      return 'heroicons_outline:duplicate';

    if (this.icon === 'user-circle')
      return 'heroicons_solid:user-circle';

    if (this.icon === 'question-mark-circle')
      return 'heroicons_outline:question-mark-circle';

    if (this.icon === 'remove-circle-outline')
      return 'remove-circle-outline';

    if (this.icon === 'ban')
      return 'heroicons_outline:ban';

    if (this.icon === 'clipboard-check')
      return 'heroicons_outline:clipboard-check';

    if (this.icon === 'pencil-alt')
      return 'heroicons_outline:pencil-alt';

    if (this.icon === 'duplicate')
      return 'heroicons_outline:duplicate';

    if (this.icon === 'folder')
      return 'heroicons_outline:folder';

    if (this.icon === 'clipboard-list')
      return 'heroicons_outline:clipboard-list';

    if (this.icon === 'lock-closed')
      return 'heroicons_outline:lock-closed';

    if (this.icon === 'calendar')
      return 'heroicons_outline:calendar';

    return 'heroicons_outline:information-circle';
  }

  iconColor(): 'primary' | 'accent' | 'warn' | undefined {
    if (this.color === 'primary')
      return 'primary';
    if (this.color === 'bold')
      return 'accent';
    if (this.color === 'warning')
      return 'warn';

    return undefined;
  }
}
