import {Component} from '@angular/core';
import {BaseComponent} from '../components/base.component';
import {Modal} from '../../../../domain/ionic/modal.ionic';

@Component({
  selector: 'spoiler-alert',
  template: `
    <fuse-card class="flex flex-col p-7">
      <div class="flex flex-row gap-5 mb-5">
        <app-icon icon="exclamation" size="10" color="warn"></app-icon>
        <div class="text-xl text-bold">{{ 'spoiler.alert' | trans }}</div>
      </div>
      <div class="flex flex-row justify-end">
        <button mat-flat-button (click)="onClose()">{{ 'accept' | trans | titlecase }}</button>
      </div>
    </fuse-card>
  `
})
export class SpoilerAlertComponent extends BaseComponent {

  constructor(public modal: Modal) {
    super();
  }

  onClose(): void {
    this.modal.dismiss();
  }
}
