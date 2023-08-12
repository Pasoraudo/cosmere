import {Component, OnInit} from '@angular/core';
import {SpoilerAlertComponent} from './ui/shared/modal/spoiler-alert.component';
import {Modal} from '../domain/ionic/modal.ionic';
import {Bootstrap} from '../domain/bootstrap/bootstrap';
import {AuthApi} from '../domain/service/api/auth.api';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent implements OnInit {

  constructor(private modal: Modal, private bootstrap: Bootstrap, private translocoService: TranslocoService, private authApi: AuthApi) {
  }

  ngOnInit(): void {
    this.bootstrap.bootstrap();

    this.authApi.me().subscribe(me => {
      this.translocoService.setActiveLang(me.lang);
      console.log(me.lang);
    });
    //this.openModal();
  }

  async openModal(): Promise<void> {
    await this.modal.present({
      component: SpoilerAlertComponent,
      cssClass: 'custom-modal',
    });
  }
}
