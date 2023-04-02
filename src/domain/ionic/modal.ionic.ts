import {Injectable} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ComponentProps, ComponentRef, FrameworkDelegate, Mode} from '@ionic/core';
import {isArray, isString} from 'lodash-es';

type ModalHeight = 'default' | 'auto' | '90vh';

export interface ModalOptions<T extends ComponentRef = ComponentRef> {
  component: T;
  componentProps?: ComponentProps<T>;
  presentingElement?: HTMLElement;
  showBackdrop?: boolean;
  backdropDismiss?: boolean;
  cssClass?: string | string[];
  delegate?: FrameworkDelegate;
  breakpoints?: number[];
  initialBreakpoint?: number;
  animated?: boolean;
  swipeToClose?: boolean;
  mode?: Mode;
  keyboardClose?: boolean;
  id?: string;
  height?: ModalHeight;

}

@Injectable({
  providedIn: 'root',
})
export class Modal {

  constructor(private readonly modalCtrl: ModalController) {
  }

  async present(options: ModalOptions): Promise<void> {
    options = this.sanetizeCssClass(options);

    if (!options.backdropDismiss) options.backdropDismiss = false;

    const modal = await this.modalCtrl.create(options);

    await modal.present();
  }

  async dismiss(data = null): Promise<void> {
    await this.modalCtrl.dismiss(data);
  }

  async create(options: ModalOptions): Promise<HTMLIonModalElement> {
    options = this.sanetizeCssClass(options);
    if (!options.backdropDismiss) options.backdropDismiss = false;

    return await this.modalCtrl.create(options);
  }

  private sanetizeCssClass(options: ModalOptions): ModalOptions {
    if (options.height === 'auto') {
      if (isString(options.cssClass) && !options.cssClass.includes('auto-height'))
        options.cssClass += ' auto-height';
      if (isArray(options.cssClass) && !options.cssClass.includes('auto-height'))
        options.cssClass.push('auto-height');
    }

    if (options.height === '90vh') {

    }


    return {...options};
  }

}
