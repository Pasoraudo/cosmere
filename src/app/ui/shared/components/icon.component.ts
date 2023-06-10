import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseComponent} from './base.component';
import {ThemePalette} from '@angular/material/core';

export type IconType = keyof typeof IconComponent.prototype.svgMappings;

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-icon [color]="color" [ngClass]="'icon-size-'+size" [svgIcon]="svg()"></mat-icon>
  `,
})
export class IconComponent extends BaseComponent {
  @Input() color: ThemePalette;
  @Input() size: '1' | '2' | '3' | '4' | '5' | '8' | '10';
  @Input() icon: IconType;

  constructor() {
    super();
  }
  svg() {
    return this.svgMappings[this.icon] || 'heroicons_outline:information-circle';
  }

  svgMappings= {
    'exclamation': 'heroicons_outline:exclamation',
    'add-user': 'heroicons_solid:user-add',
    'refresh': 'heroicons_outline:refresh',
    'save': 'heroicons_outline:save',
    'add': 'heroicons_outline:plus',
    'create': 'heroicons_outline:plus-circle',
    'create-solid': 'heroicons_solid:plus-circle',
    'cart': 'heroicons_outline:shopping-cart',
    'search-solid': 'heroicons_solid:search-circle',
    'edit': 'heroicons_outline:pencil-alt',
    'search': 'heroicons_outline:search-circle',
    'info': 'heroicons_outline:information-circle',
    'check': 'heroicons_solid:check',
    'check-circle': 'checkmark-circle-outline',
    'x': 'heroicons_solid:x',
    'eye': 'heroicons_outline:eye',
    'document': 'heroicons_outline:document',
    'trash': 'heroicons_outline:trash',
    'upload': 'heroicons_outline:upload',
    'book-open': 'heroicons_solid:book-open',
    'clone': 'heroicons_outline:duplicate',
    'user-circle': 'heroicons_solid:user-circle',
    'question-mark-circle': 'heroicons_outline:question-mark-circle',
    'remove-circle-outline': 'remove-circle-outline',
    'ban': 'heroicons_outline:ban',
    'clipboard-check': 'heroicons_outline:clipboard-check',
    'pencil-alt': 'heroicons_outline:pencil-alt',
    'duplicate': 'heroicons_outline:duplicate',
    'folder': 'heroicons_outline:folder',
    'clipboard-list': 'heroicons_outline:clipboard-list',
    'lock-closed': 'heroicons_outline:lock-closed',
    'calendar': 'heroicons_outline:calendar',
    'settings': 'feather:settings',
  };
}
