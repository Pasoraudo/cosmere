import {Component, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, map, Subject, takeUntil} from 'rxjs';
import {AppConfig} from '../../../core/config/app.config';

@Component({
    selector     : 'layout',
    templateUrl  : './layout-no-bar.component.html',
    styleUrls    : ['./layout-no-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutNoBarComponent implements OnInit, OnDestroy
{
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
        private _router: Router,
    )
    {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
