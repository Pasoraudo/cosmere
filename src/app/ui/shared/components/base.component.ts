import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {uuid} from '../../../../domain/function/uuid.helper';
import {Alert} from 'domain/ionic/alert.ionic';

export interface SubscriptionData {
  id: string;
  subscription: Subscription;
}

@Component({
  template: ''
})
export class BaseComponent implements OnDestroy {
  @Output() exitNotSave = new EventEmitter<void>();
  @Output() saveAndBack = new EventEmitter<void>();
  @Output() saveAndNew = new EventEmitter<void>();

  private subscriptionsData: SubscriptionData[] = [];


  constructor() {
  }

  ngOnDestroy(): void {
    this.allSubscriptions().forEach((subscription) => {
      subscription.unsubscribe();
    });

    this.onDestroy();

  }

  onDestroy(): void {

  }

  protected subscribe<T>(
    observable: Observable<T>,
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): string {
    const id = uuid();

    this.subscriptionsData.push({
      id,
      subscription: observable.subscribe(next, error, complete),
    });

    return id;
  }

  protected unsubscribe(subscriptionId: string): void {
    const subscription = this.subscriptionById(subscriptionId);

    if (!subscription || subscription.closed) return;

    subscription.unsubscribe();
  }

  protected unsubscribeAll(): void {
    this.subscriptionsData.forEach(subscription => subscription.subscription.unsubscribe());
  }

  protected allSubscriptions(): Subscription[] {
    return this.subscriptionsData.map(subscriptionData => subscriptionData.subscription);
  }

  protected async showErrorSave(alert: Alert): Promise<void> {
    await alert.present({
      header: 'Error',
      message: 'Ha ocurrido un error guardando',
      buttons: ['OK']
    });
  }

  private subscriptionById(subscriptionId): Subscription | null {
    const subscription = this.subscriptionsData.find(item => item.id === subscriptionId);

    return subscription?.subscription;
  }


}
