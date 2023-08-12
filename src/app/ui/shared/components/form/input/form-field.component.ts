import {AfterViewInit, Component, ContentChild} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {AppFormLabelComponent} from './form-label.component';

@Component({
  selector: 'app-form-field',
  template: `
    <div class="font-medium leading-7 " [innerHtml]="labelHtml"></div>
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      margin-top: -2px;
      margin-bottom: 12px;
    }
  `]

})
export class AppFormFieldComponent extends BaseComponent implements AfterViewInit {

  @ContentChild(AppFormLabelComponent, {static: true}) label: AppFormLabelComponent;

  labelHtml: string = '';

  constructor() {
    super();
  }

  ngAfterViewInit(): void {

    this.subscribe(this.label?.stateChange$, (componentDomChange: { innerHtml: string }) => {
      this.labelHtml = componentDomChange.innerHtml;
    });

    this.labelHtml = this.label.html;
  }


}
