import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {Entity} from '../../../../../../domain/model/shared.model';

@Component({
  selector: 'app-select-autocomplete-entity',
  template: `
    <div class="flex flex-row w-full">
      <app-form-field class="mat-form-field w-full">
        <mat-label class="font-medium">{{label}}</mat-label>
        <ng-select style="margin-top: 0.35rem" [formControl]="localControl" [virtualScroll]="true"
                   placeholder="{{placeholder}}" [multiple]="multiple"
                   (search)="searchOptions($event.term)" [clearable]="false" (change)="change($event)">
          <ng-option *ngFor="let option of selectedOptions"
                     value="{{option.id}}">{{option[this.valueField]}}</ng-option>
          <ng-option *ngFor="let option of filteredOptions"
                     value="{{option.id}}">{{option[this.valueField]}}</ng-option>
        </ng-select>
      </app-form-field>
    </div>
  `,
})
export class AppSelectAutocompleteEntityComponent implements OnChanges {
  @Input() control: AbstractControl;
  @Input() options: Entity[] = [];
  @Input() label: string;
  @Input() placeholder: string;
  @Input() valueField: string;
  @Input() multiple: boolean = false;

  @Output() readonly valueChanges: EventEmitter<any> = new EventEmitter<any>();

  selectedOptions: Entity[];
  filteredOptions: Entity[];
  localControl: FormControl;
  itemsPerPage = 20;

  constructor() {
  }

  ngOnChanges(): void {
    if (!this.control)
      return;

    this.localControl = this.control as FormControl;
    this.searchOptions('');
  }

  searchOptions(value: string): void {
    const filterValue = value.toLowerCase();

    this.selectedOptions = this.options.filter(option => this.localControl.value.includes(option.id));
    let filteredOptions: Entity[] = this.options;
    if (value.length > 0)
      filteredOptions = filteredOptions.filter(option => option[this.valueField].toLowerCase().includes(filterValue));

    this.filteredOptions = filteredOptions.filter(option => !this.localControl.value.includes(option.id)).slice(0, this.itemsPerPage);
  }

  change($event: Event): void {
    this.searchOptions('');
    this.valueChanges.emit($event);
  }
}
