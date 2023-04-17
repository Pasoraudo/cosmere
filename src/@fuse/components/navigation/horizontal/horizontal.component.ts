import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {animate, AnimationBuilder, AnimationPlayer, style} from '@angular/animations';
import {Router} from '@angular/router';
import {ScrollStrategy, ScrollStrategyOptions} from '@angular/cdk/overlay';
import {delay, merge, ReplaySubject, Subject, Subscription, takeUntil} from 'rxjs';
import {fuseAnimations} from '@fuse/animations';
import {FuseNavigationAppearance, FuseNavigationItem} from '@fuse/components/navigation/navigation.types';
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';
import {FuseScrollbarDirective} from '@fuse/directives/scrollbar/scrollbar.directive';
import {FuseUtilsService} from '@fuse/services/utils/utils.service';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'fuse-horizontal-navigation',
  templateUrl: './horizontal.component.html',
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'fuseHorizontalNavigation'
})
export class FuseHorizontalNavigationComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_inner: BooleanInput;
  static ngAcceptInputType_opened: BooleanInput;
  static ngAcceptInputType_transparentOverlay: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() appearance: FuseNavigationAppearance = 'default';
  @Input() inner: boolean = false;
  @Input() name: string = this._fuseUtilsService.randomId();
  @Input() navigation: FuseNavigationItem[];
  @Input() transparentOverlay: boolean = false;
  @ViewChild('navigationContent') private _navigationContentEl: ElementRef;

  onCollapsableItemCollapsed: ReplaySubject<FuseNavigationItem> = new ReplaySubject<FuseNavigationItem>(1);
  onCollapsableItemExpanded: ReplaySubject<FuseNavigationItem> = new ReplaySubject<FuseNavigationItem>(1);
  onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _animationsEnabled: boolean = false;
  private _asideOverlay: HTMLElement;
  private readonly _handleOverlayClick: any;
  private _hovered: boolean = false;
  private _overlay: HTMLElement;
  private _player: AnimationPlayer;
  private _scrollStrategy: ScrollStrategy = this._scrollStrategyOptions.block();
  private _fuseScrollbarDirectives!: QueryList<FuseScrollbarDirective>;
  private _fuseScrollbarDirectivesSubscription: Subscription;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(
    private _animationBuilder: AnimationBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _renderer2: Renderer2,
    private _router: Router,
    private _scrollStrategyOptions: ScrollStrategyOptions,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseUtilsService: FuseUtilsService
  ) {
  }

  @HostBinding('class') get classList(): any {
    return {
      'fuse-vertical-navigation-animations-enabled': this._animationsEnabled,
      [`fuse-vertical-navigation-appearance-${this.appearance}`]: true,
      'fuse-vertical-navigation-hover': this._hovered,
      'fuse-vertical-navigation-inner': this.inner
    };
  }

  @HostBinding('style') get styleList(): any {
    return {
      'visibility': 'visible'
    };
  }

  @ViewChildren(FuseScrollbarDirective)
  set fuseScrollbarDirectives(fuseScrollbarDirectives: QueryList<FuseScrollbarDirective>) {
    this._fuseScrollbarDirectives = fuseScrollbarDirectives;

    if (fuseScrollbarDirectives.length === 0) {
      return;
    }

    if (this._fuseScrollbarDirectivesSubscription) {
      this._fuseScrollbarDirectivesSubscription.unsubscribe();
    }

    this._fuseScrollbarDirectivesSubscription =
      merge(
        this.onCollapsableItemCollapsed,
        this.onCollapsableItemExpanded
      )
        .pipe(
          takeUntil(this._unsubscribeAll),
          delay(250)
        )
        .subscribe(() => {
          fuseScrollbarDirectives.forEach((fuseScrollbarDirective) => {
            fuseScrollbarDirective.update();
          });
        });
  }

  @HostListener('mouseenter')
  private _onMouseenter(): void {
    this._enableAnimations();

    this._hovered = true;
  }

  @HostListener('mouseleave')
  private _onMouseleave(): void {
    this._enableAnimations();

    this._hovered = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('inner' in changes) {
      this.inner = coerceBooleanProperty(changes.inner.currentValue);
    }

    if ('navigation' in changes) {
      this._changeDetectorRef.markForCheck();
    }

    if ('transparentOverlay' in changes) {
      this.transparentOverlay = coerceBooleanProperty(changes.transparentOverlay.currentValue);
    }
  }

  ngOnInit(): void {
    if (this.name === '') {
      this.name = this._fuseUtilsService.randomId();
    }

    this._fuseNavigationService.registerComponent(this.name, this);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this._navigationContentEl) {
        return;
      }

      if (!this._navigationContentEl.nativeElement.classList.contains('ps')) {
        const activeItem = this._navigationContentEl.nativeElement.querySelector('.fuse-vertical-navigation-item-active');

        if (activeItem) {
          activeItem.scrollIntoView();
        }
      }
      else {
        this._fuseScrollbarDirectives.forEach((fuseScrollbarDirective) => {

          if (!fuseScrollbarDirective.isEnabled()) {
            return;
          }

          fuseScrollbarDirective.scrollToElement('.fuse-vertical-navigation-item-active', -120, true);
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Deregister the navigation component from the registry
    this._fuseNavigationService.deregisterComponent(this.name);

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  refresh(): void {
    this._changeDetectorRef.markForCheck();

    this.onRefreshed.next(true);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private _enableAnimations(): void {
    if (this._animationsEnabled) {
      return;
    }

    this._animationsEnabled = true;
  }

  private _disableAnimations(): void {
    if (!this._animationsEnabled) {
      return;
    }

    this._animationsEnabled = false;
  }

  private _showOverlay(): void {
    if (this._asideOverlay) {
      return;
    }
    this._overlay = this._renderer2.createElement('div');
    this._overlay.classList.add('fuse-vertical-navigation-overlay');

    if (this.transparentOverlay) {
      this._overlay.classList.add('fuse-vertical-navigation-overlay-transparent');
    }
    this._renderer2.appendChild(this._elementRef.nativeElement.parentElement, this._overlay);
    this._scrollStrategy.enable();

    this._player = this._animationBuilder.build([
      animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({opacity: 1}))
    ]).create(this._overlay);
    this._player.play();
    this._overlay.addEventListener('click', this._handleOverlayClick);
  }

  private _hideOverlay(): void {
    if (!this._overlay) {
      return;
    }

    this._player = this._animationBuilder.build([
      animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({opacity: 0}))
    ]).create(this._overlay);

    this._player.play();

    this._player.onDone(() => {

      if (this._overlay) {
        this._overlay.removeEventListener('click', this._handleOverlayClick);

        this._overlay.parentNode.removeChild(this._overlay);
        this._overlay = null;
      }

      this._scrollStrategy.disable();
    });
  }
}
