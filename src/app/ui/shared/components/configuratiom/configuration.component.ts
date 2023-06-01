import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../base.component';
import {Configuration} from '../../../../../domain/model/configuration';
import {FormControl, FormGroup} from '@angular/forms';
import {FormBuilderService} from '../../../../../domain/service/form/form.builder';
import {BookApi} from '../../../../../domain/service/api/book.api';
import {Book} from '../../../../../domain/model/book';
import {defer} from 'lodash';


@Component({
  selector: 'configuration',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'configuration.component.html'
})
export class ConfigurationComponent extends BaseComponent implements OnInit {

  @Output() readonly configurationChanges: EventEmitter<Configuration> = new EventEmitter<Configuration>();
  configuration: Configuration = {
    id: '',
    bookIds: []
  };
  filterForm: FormGroup;
  showCard = false;
  data: {
    books: Book[];
  } = {
    books: []
  }

  constructor(private formBuilder: FormBuilderService, private bookApi: BookApi) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.bookApi.allBooks(), books => this.setBooks(books));

    defer(async () => {
      await this.bookApi.fetchAllBooks();
    });
    this.buildForm();
  }

  buildForm(): void {
    this.filterForm = new FormGroup({
      bookControl: new FormControl([''])
    });
  }

  applyFilters(): void {
    this.configurationChanges.emit(this.configuration);
  }

  setBooks(books: Book[]): void {
    this.data.books = books;
  }

  toggle() {
    this.showCard = !this.showCard;
  }
}
