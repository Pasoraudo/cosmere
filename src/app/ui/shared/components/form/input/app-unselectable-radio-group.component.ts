import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-unselectable-radio-group',
  template: `
    <mat-radio-group [formControl]="control" (change)="onRadioGroupChanges()" class="flex gap-5">
      <mat-radio-button *ngFor="let option of options" [value]="option" (click)="onRadioButtonClick(option)">
        {{ option | trans | titlecase }}
      </mat-radio-button>
    </mat-radio-group>
  `,
})
export class AppUnselectableRadioGroupComponent implements OnInit {
  @Input() control: FormControl = new FormControl('');
  @Input() options: string[] = [];
  @Input() defaultValue: string = '';
  @Output() readonly valueChanges: EventEmitter<string> = new EventEmitter<string>();

  lastOption: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.lastOption = this.defaultValue;
    this.control.setValue(this.defaultValue);
  }

  onRadioButtonClick(option: string): void {
    if (option === this.lastOption) {
      this.control.setValue(this.defaultValue);
      this.lastOption = this.defaultValue;
    } else {
      this.control.setValue(option);
      this.lastOption = option;
    }
    this.valueChanges.emit(this.control.value);
  }

  onRadioGroupChanges(): void {
    this.control.setValue(this.lastOption);
    this.valueChanges.emit(this.control.value);
  }
}
