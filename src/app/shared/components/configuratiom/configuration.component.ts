import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../base.component';
import {Configuration} from '../../../../../domain/model/configuration';
import {FormGroup} from '@angular/forms';
import {FormBuilderService} from '../../../../../domain/service/form/form.builder';
import {BookApi} from '../../../../../domain/service/api/book.api';
import {Book} from '../../../../../domain/model/book';
import {defer} from 'lodash';
import {ConfigurationApi} from '../../../../../domain/service/api/configuration.api';


@Component({
  selector: 'configuration',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'configuration.component.html'
})
export class ConfigurationComponent extends BaseComponent implements OnInit {

  @Output() readonly configurationChanges: EventEmitter<Configuration> = new EventEmitter<Configuration>();
  configuration: Configuration;
  configurationForm: FormGroup;
  showCard = false;
  data: {
    books: Book[];
  } = {
    books: []
  }

  constructor(private configurationApi: ConfigurationApi, private formBuilder: FormBuilderService, private bookApi: BookApi) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.bookApi.allBooks(), books => this.data.books = books);
    this.subscribe(this.configurationApi.configuration(), (configuration) => this.setConfiguration(configuration));

    defer(async () => {
      await this.bookApi.fetchAllBooks();
    });
    this.buildForm();
  }

  buildForm(): void {
    this.configurationForm = this.formBuilder.build(this.configuration);

    this.configurationForm.get('books').valueChanges.subscribe(books => {
      this.configuration.books = books;
      this.saveConfiguration();
    });
  }

  toggle() {
    this.showCard = !this.showCard;
  }

  setConfiguration(configuration: Configuration): void {
    this.configuration = {...configuration};

    if (!this.configurationForm)
      return;
    this.configurationForm.patchValue(configuration);
  }

  saveConfiguration(): void {
    this.configurationApi.saveConfiguration(this.configuration);
  }
}
