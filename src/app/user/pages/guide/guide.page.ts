import {Component, effect, OnInit} from '@angular/core';
import {BasePage} from '../../../shared/page/base.page';
import {GuideApi} from '../../../../domain/service/api/guide.api';
import {BookApi} from '../../../../domain/service/api/book.api';
import {Book} from '../../../../domain/model/book';
import {Guide, GuideRelationshipType} from '../../../../domain/model/guide';
import {defer} from 'lodash';
import {trans} from '../../../../domain/service/translations/translator.service';
import {FormControl} from '@angular/forms';
import {SagaApi} from '../../../../domain/service/api/saga.api';
import {Saga} from '../../../../domain/model/saga';
import {AppNetworkComponent} from '../../../shared/components/app-network.component';
import {GraphEdge, GraphNode, GraphOptions} from '../../../../infrastructure/vis/model/network';

@Component({
  selector: 'network',
  standalone: true,
  imports: [
    AppNetworkComponent
  ],
  template: `
    <div class="inset-0 flex flex-col min-w-0 w-full overflow-hidden">
      <div class="flex flex-row h-full w-full grow justify-center">
        <app-network class="h-full w-full" [nodes]="nodes" [edges]="edges" [options]="options"></app-network>
      </div>
    </div>
  `,
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
  options: GraphOptions = {
    directed: true,
    drag: true,
    nodeColors: this.nodeColors(),
    edgeColors: this.edgeColors(),
    curveEdges: true,
    hover: false,
    edgeWidth: 3,
  }
  guideControl: FormControl = new FormControl();

  constructor(private readonly bookApi: BookApi,
              private readonly guideApi: GuideApi,
              private readonly sagaApi: SagaApi
  ) {
    super();
    effect(() => {
      const books = this.bookApi.allBooks()();
      this.onBooksChanged(books);
    });
    effect(() => {
      const guides = this.guideApi.allGuides()();
      this.onGuidesChanged(guides);
    });
    effect(() => {
      const sagas = this.sagaApi.allSagas()();
      this.onSagasChanged(sagas);
    });
  }

  async ngOnInit() {
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
        score: 20,
      }
    });
    if (guide.order.find(edge => edge.type === 'start'))
      this.nodes.push({
        id: 'start',
        label: trans('Start'),
        group: 'start',
        score: 20,
      });
    this.edges = guide.order.map(guideRelationship => {
      return {
        source: guideRelationship.sourceId,
        target: guideRelationship.targetId,
        weight: 1,
        group: guideRelationship.type
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

  edgeColors(): Record<GuideRelationshipType, string> {
    return {
      "highly_recommended": "#00A78E",
      "recommended": "#FFC107",
      "not_recommended": "#E53935",
      "optional": "#9E9E9E",
      "start": "#FFFFFF"
    };
  }

  nodeColors(): Record<string, string> {
    return {
      "start": "#FFFFFF"
    };
  }
}
