import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges,} from "@angular/core";
import {uuid} from "@helper/uuid.helper";
import {none} from "@helper/void.helper";
import {Observable, Subscription} from "rxjs";

export interface SubscriptionData {
  id: string;
  subscription: Subscription;
}

@Component({
  template: "",
})
export abstract class BaseComponent implements OnDestroy, OnInit, OnChanges {
  private subscriptionsData: SubscriptionData[] = [];

  ngOnDestroy(): void {
    this.onDestroy();
  }

  ngOnInit(): void {
    this.onInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges(changes);
  }

  onInit(): void {
    none();
  }

  onChanges(_changes?: SimpleChanges): void {
    none();
  }

  onDestroy(): void {
    none();
  }

  protected subscribe<T>(
    observable: Observable<T>,
    next?: (value: T) => void,
    error?: (error: unknown) => void,
    complete?: () => void,
  ): string {
    const id = uuid();

    if (!observable) return id;

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
    this.subscriptionsData.forEach((subscription) =>
      subscription.subscription.unsubscribe(),
    );
  }

  protected allSubscriptions(): Subscription[] {
    return this.subscriptionsData.map(
      (subscriptionData) => subscriptionData.subscription,
    );
  }

  private subscriptionById(subscriptionId: string): Subscription | undefined {
    const subscription = this.subscriptionsData.find(
      (item) => item.id === subscriptionId,
    );

    return subscription?.subscription;
  }
}
