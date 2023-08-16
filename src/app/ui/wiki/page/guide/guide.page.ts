import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BasePage} from '../../../shared/page/base.page';
import {GuideApi} from '../../../../../domain/service/api/guide.api';
import {BookApi} from '../../../../../domain/service/api/book.api';
import {D3Options, GraphEdge, GraphNode} from '../../../infrastructure/vis/model/network';
import {Book} from '../../../../../domain/model/book';
import {Guide, GuideRelationshipType, guideRelationshipTypes} from '../../../../../domain/model/guide';
import {defer} from 'lodash';
import {trans} from '../../../../../domain/service/translations/translator.service';
import {FormControl} from '@angular/forms';
import {SagaApi} from '../../../../../domain/service/api/saga.api';
import {Saga} from '../../../../../domain/model/saga';

@Component({
  selector: 'network',
  templateUrl: './guide.page.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .square {
      width: 20px;
      height: 20px;
      border: black;
      border-radius: 6px;
    }
  `]
})
export class GuidePage extends BasePage implements OnInit {
  nodes: GraphNode[] = [];
  edges: GraphEdge[] = [];
  books: Book[] = [];
  guides: Guide[] = [];
  sagas: Saga[] = [];
  guideRelationshipTypes = guideRelationshipTypes();
  options: D3Options = {
    directed: true,
    drag: true,
    colors: this.colors(),
    curveEdges: true
  }
  guideControl: FormControl = new FormControl();

  constructor(private bookApi: BookApi, private guideApi: GuideApi, private sagaApi: SagaApi) {
    super();
  }

  async ngOnInit() {
    this.subscribe(this.bookApi.allBooks(), books => {
      this.onBooksChanged(books);
    });
    this.subscribe(this.guideApi.allGuides(), guides => {
      this.onGuidesChanged(guides);
    });
    this.subscribe(this.sagaApi.allSagas(), sagas => {
      this.onSagasChanged(sagas);
    });
    this.subscribe(this.guideControl.valueChanges, guideId => this.regenerateNetworkParameters());

    defer(async () => {
      await this.bookApi.fetchAllBooks();
      await this.guideApi.fetchAllGuides();
      await this.sagaApi.fetchAllSagas();
    });
  }

  regenerateNetworkParameters(): void {
    if (this.guides.length === 0)
      return;
    if (this.books.length === 0)
      return;
    const guide: Guide = this.guides.find(guide => guide.id === this.guideControl.value);

    this.nodes = this.books.map(book => {
      return {
        id: book.id,
        label: trans(book.title),
        group: this.getSagaFromBook(book),
        score: 30,
      }
    })
    this.edges = guide.order.map(guideRelationship => {
      return {
        source: guideRelationship.sourceId,
        target: guideRelationship.targetId,
        weight: 1,
      }
    });
  }

  onBooksChanged(books: Book[]): void {
    this.books = books;
    this.regenerateNetworkParameters();
  }

  onGuidesChanged(guides: Guide[]): void {
    this.guides = guides;
    this.guideControl.setValue(guides[1].id);
    this.regenerateNetworkParameters();
  }

  onSagasChanged(sagas: Saga[]): void {
    this.sagas = sagas;
    this.regenerateNetworkParameters();
  }

  getSagaFromBook(book: Book): string {
    return this.sagas?.find(saga => saga.bookIds.includes(book.id))?.title ?? book.title
  }

  colors(): Record<GuideRelationshipType, string> {
    return {
      "highly_recommended": "#00A78E",
      "recommended": "#FFC107",
      "not_recommended": "#E53935",
      "optional": "#9E9E9E",
    };
  }
}
