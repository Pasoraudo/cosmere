import {AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef} from '@angular/core';
import {Subject} from 'rxjs';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'app-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: none;
    }
  `]

})
export class AppFormLabelComponent extends BaseComponent implements AfterViewChecked {
  readonly stateChange$ = new Subject<{ innerHtml: string }>();
  private _previousLabel: string;

  constructor(public elementRef: ElementRef<HTMLElement>) {
    super();
  }

  get label(): string {
    return (this.elementRef.nativeElement.textContent || '').trim();
  }

  get html(): string {
    return this.elementRef.nativeElement.innerHTML;
  }

  ngAfterViewChecked(): void {
    if (this.label === this._previousLabel)
      return;

    this._previousLabel = this.label;
    this.stateChange$.next({
      innerHtml: this.elementRef.nativeElement.innerHTML
    });
  }

  onDestroy(): void {
    this.stateChange$.complete();
  }


}
