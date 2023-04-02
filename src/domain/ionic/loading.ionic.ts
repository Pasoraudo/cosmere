import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {IonicSafeString} from '@ionic/core/dist/types/utils/sanitization';

export interface LoadingOptions {
  message?: string | IonicSafeString;
  cssClass?: string | string[];
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class Loading {

  constructor(private readonly loading: LoadingController) {
  }

  async present(options?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    if (!options)
      options = {};

    options = {...options, cssClass: 'custom-loading'};
    const loading = await this.loading.create(options);
    await loading.present();

    return loading;
  }

  async dismiss(): Promise<boolean> {
    return this.loading.dismiss();
  }

}
