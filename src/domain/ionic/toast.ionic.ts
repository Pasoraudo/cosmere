import {Injectable} from '@angular/core';
import {ToastController, ToastOptions} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class IonicToast {

  constructor(public toastController: ToastController) {
  }

  async presentToast(options: ToastOptions): Promise<void> {
    const toast = await this.toastController.create(options);
    await toast.present();
  }

}
