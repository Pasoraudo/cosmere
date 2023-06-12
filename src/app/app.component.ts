import {Component, OnInit} from '@angular/core';
import {SpoilerAlertComponent} from './ui/shared/modal/spoiler-alert.component';
import {Modal} from '../domain/ionic/modal.ionic';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent implements OnInit {

  constructor(private modal: Modal) {
  }

  ngOnInit(): void {
    //this.openModal();
  }

  async openModal(): Promise<void> {
    await this.modal.present({
      component: SpoilerAlertComponent,
      cssClass: 'custom-modal',
    });
  }
}
