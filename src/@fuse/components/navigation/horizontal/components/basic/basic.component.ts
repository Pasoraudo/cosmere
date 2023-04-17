import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IsActiveMatchOptions} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';
import {FuseNavigationItem} from '@fuse/components/navigation/navigation.types';
import {FuseUtilsService} from '@fuse/services/utils/utils.service';
import {FuseHorizontalNavigationComponent} from '../../horizontal.component';

@Component({
  selector: 'fuse-horizontal-navigation-basic-item',
  templateUrl: './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseHorizontalNavigationBasicItemComponent implements OnInit, OnDestroy {
  @Input() item: FuseNavigationItem;
  @Input() name: string;

  isActiveMatchOptions: IsActiveMatchOptions;
  private _fuseHorizontalNavigationComponent: FuseHorizontalNavigationComponent;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _fuseNavigationService: FuseNavigationService, private _fuseUtilsService: FuseUtilsService) {
    this.isActiveMatchOptions = this._fuseUtilsService.subsetMatchOptions;
  }

  ngOnInit(): void {
    // Set the "isActiveMatchOptions" either from item's
    // "isActiveMatchOptions" or the equivalent form of
    // item's "exactMatch" option
    this.isActiveMatchOptions =
      this.item.isActiveMatchOptions ?? this.item.exactMatch
        ? this._fuseUtilsService.exactMatchOptions
        : this._fuseUtilsService.subsetMatchOptions;

    // Get the parent navigation component
    this._fuseHorizontalNavigationComponent = this._fuseNavigationService.getComponent(this.name);

    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Subscribe to onRefreshed on the navigation component
    this._fuseHorizontalNavigationComponent.onRefreshed.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(() => {

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
