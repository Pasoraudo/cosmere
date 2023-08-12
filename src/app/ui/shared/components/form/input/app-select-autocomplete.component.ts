import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
  selector: 'app-select-autocomplete',
  template: `
    <div class="flex flex-row w-full">
      <app-form-field class="mat-form-field w-full">
        <mat-label class="font-medium">{{label}}</mat-label>
        <ng-select style="margin-top: 0.35rem" [formControl]="localControl" [virtualScroll]="true"
                   placeholder="{{placeholder}}"
                   (search)="searchOptions($event.term)" (change)="valueChanges.emit()" [clearable]="false">
          <ng-option *ngFor="let option of filteredOptions"
                     value="{{option}}">{{option}}</ng-option>
        </ng-select>
      </app-form-field>
    </div>
  `,
})
export class AppSelectAutocompleteComponent implements OnInit {
  @Input() control: AbstractControl = new FormControl();
  @Input() options: string[] = [];
  @Input() label: string;
  @Input() placeholder: string;

  @Output() readonly valueChanges: EventEmitter<any> = new EventEmitter<any>();

  filteredOptions: string[];
  localControl: FormControl;

  constructor() {
  }

  ngOnInit(): void {
    if (!this.control)
      return;

    this.filteredOptions = this.options;
    this.localControl = this.control as FormControl;
  }

  searchOptions(value: string): void {
    const filterValue = value.toLowerCase();

    if (value.length > 0)
      this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(filterValue));
    else
      this.filteredOptions = this.options;
  }
}
