import {Component, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {uuid} from '../../../../domain/function/uuid.helper';

export interface SubscriptionData {
  id: string;
  subscription: Subscription;
}

@Component({
  template: ''
})
export class BasePage implements OnDestroy {

  private subscriptionsData: SubscriptionData[] = [];

  constructor() {
  }

  ngOnDestroy(): void {
    this.allSubscriptions().forEach((subscription) => {
      subscription.unsubscribe();
    });
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

  private subscriptionById(subscriptionId): Subscription | null {
    const subscription = this.subscriptionsData.find(item => item.id === subscriptionId);

    return subscription?.subscription;
  }

}
