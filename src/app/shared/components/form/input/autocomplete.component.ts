import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {map, Observable, startWith} from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  template: `
    <mat-form-field class="fuse-mat-dense w-full" floatLabel="always">
      <mat-label *ngIf="label">{{label}}</mat-label>
      <input type="text" matInput placeholder="{{placeholder}}" aria-label="Tipo" [formControl]="localControl"
             [matAutocomplete]="auto" (input)="valueChanges.emit()">
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="valueChanges.emit()">
        <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
          {{option}}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  `,
})
export class AutocompleteComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() options: string[] = [];
  @Input() label: string;
  @Input() placeholder: string;

  @Output() readonly valueChanges: EventEmitter<string> = new EventEmitter<string>();

  filteredOptions: Observable<string[]>;
  localControl: FormControl;
  itemsPerPage = 20;

  constructor() {
  }

  ngOnInit(): void {
    if (!this.control)
      return;
    this.localControl = this.control as FormControl;

    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options
      .filter(option => option.toLowerCase().includes(filterValue))
      .slice(0, this.itemsPerPage);
  }
}
