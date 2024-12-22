import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {map, Observable, startWith} from 'rxjs';
import {Entity} from '../../../../../../domain/model/shared.model';
import {byId} from '../../../../../../domain/function/search.helper';

@Component({
  selector: 'app-autocomplete-entity',
  template: `
    <mat-form-field class="fuse-mat-dense w-full" floatLabel="always">
      <mat-label *ngIf="label">{{label}}</mat-label>
      <input type="text" matInput placeholder="{{placeholder}}" aria-label="Tipo" [formControl]="valueFormControl"
             [matAutocomplete]="auto" (input)="valueChanges.emit()">
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="optionSelected($event.option.value)"
                        [displayWith]="displayWith">
        <mat-option *ngFor="let option of filteredOptionsObserver | async" [value]="option">
          {{option[valueField]}}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  `,

})
export class AutocompleteEntityComponent implements OnInit {
  @Input() options: Entity[] = [];
  @Input() valueField: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() control: AbstractControl = new FormControl([]);

  @Output() readonly valueChanges: EventEmitter<Entity> = new EventEmitter<Entity>();

  valueFormControl: FormControl = new FormControl('');
  filteredOptionsObserver: Observable<Entity[]>;
  itemsPerPage = 20;

  constructor() {
  }

  ngOnInit(): void {
    this.valueFormControl.setValue(byId(this.control.value, this.options));
    this.filteredOptionsObserver = this.valueFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value[this.valueField];
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  optionSelected(option: Entity): void {
    this.control.setValue(option.id);
    this.valueChanges.emit(option);
  }

  displayWith = (option: Entity): string => {
    return option && option[this.valueField] ? option[this.valueField] : '';
  };

  private _filter(value: string): Entity[] {
    const filterValue = value.toLowerCase();
    return this.options
      .filter(option => option[this.valueField].toLowerCase().includes(filterValue))
      .slice(0, this.itemsPerPage);
  }
}
