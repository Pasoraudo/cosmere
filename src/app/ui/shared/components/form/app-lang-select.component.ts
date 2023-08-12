import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Entity} from '../../../../../domain/model/shared.model';
import {FormControl} from '@angular/forms';
import {AuthApi} from '../../../../../domain/service/api/auth.api';
import {UpdateLanguage} from '../../../../../domain/model/auth';

interface Language extends Entity {
  name: string;
}

@Component({
  selector: 'app-lang-select',
  encapsulation: ViewEncapsulation.None,
  template: `
    <mat-form-field class="mat-form-field">
      <mat-select [formControl]="control" (valueChange)="languageChanged($event)">
        <mat-option *ngFor="let lang of languages" [value]="lang.id">
          {{lang.name}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class AppLangSelectComponent implements OnInit {
  control: FormControl = new FormControl('en');
  languages: Language[] = [{'name': 'Español', 'id': 'es'}, {'name': 'English', 'id': 'en'}];

  constructor(private authApi: AuthApi) {
  }

  ngOnInit(): void {
    this.control.setValue(this.authApi.syncMe().lang);
  }

  languageChanged(lang: string): void {
    const me = this.authApi.syncMe();
    const command: UpdateLanguage = {
      id: me.id,
      lang: lang
    }
    this.authApi.updateLanguage(command);
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }
}
