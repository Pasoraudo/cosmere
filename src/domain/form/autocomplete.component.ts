import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, Observable, startWith} from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  template: `
    <input type="text" matInput placeholder="Selecciona uno"
           aria-label="Tipo" [formControl]="formControl" [matAutocomplete]="auto">
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
        {{option}}
      </mat-option>
    </mat-autocomplete>
  `,

})
export class AutocompleteComponent implements OnInit {
  @Input() formControl: FormControl;
  @Input() options: any[] = [];
  filteredOptions: Observable<string[]>;

  constructor() {
  }

  ngOnInit(): void {
    this.options = ['One', 'Two', 'Three'];
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


}
