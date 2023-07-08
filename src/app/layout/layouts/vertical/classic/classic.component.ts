import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {NavigationItem, wikiNavigation} from '../../../navigation/wiki-navigation';

@Component({
  selector: 'classic-layout',
  templateUrl: './classic.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ClassicLayoutComponent implements OnInit, OnDestroy {
  navigation: NavigationItem[] = wikiNavigation;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
