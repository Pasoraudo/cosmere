import {Injectable} from '@angular/core';
import {AlertController, AlertOptions as IonicAlertOptions} from '@ionic/angular';

export type AlertOptions = IonicAlertOptions;

@Injectable({
  providedIn: 'root',
})
export class Alert {

  constructor(private readonly alert: AlertController) {
  }

  async present(options: AlertOptions): Promise<HTMLIonAlertElement> {
    options = {...options, cssClass: ['custom-alert-size', 'custom-alert']};
    const alert = await this.alert.create(options);
    await alert.present();

    return alert;
  }

  async dismiss(): Promise<boolean> {
    return this.alert.dismiss();
  }

}
