import {Component, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {AppConfig} from '../../../core/config/app.config';

@Component({
  selector: 'layout',
  templateUrl: './layout-user.component.html',
  styleUrls: ['./layout-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutUserComponent implements OnInit, OnDestroy {
  config: AppConfig;
  layout: 'classic';
  scheme: 'light';
  theme: string;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private _document: any,
    private _renderer2: Renderer2,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }


  private _updateScheme(): void {
    this._document.body.classList.remove('light', 'dark');

    this._document.body.classList.add(this.scheme);
  }

  private _updateTheme(): void {
    this._document.body.classList.forEach((className: string) => {
      if (className.startsWith('theme-')) {
        this._document.body.classList.remove(className, className.split('-')[1]);
      }
    });

    // Add class name for the currently selected theme
    this._document.body.classList.add(this.theme);
  }
}
