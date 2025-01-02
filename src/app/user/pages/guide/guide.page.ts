import {Component, effect, OnInit} from '@angular/core';
import {BasePage} from '@app/shared/page/base.page';
import {GuideApi} from '@service/api/guide.api';
import {BookApi} from '@service/api/book.api';
import {Book} from '@model/book';
import {Guide, GuideRelationshipType} from '@model/guide';
import {defer} from 'lodash';
import {FormControl} from '@angular/forms';
import {SagaApi} from '@service/api/saga.api';
import {Saga} from '@model/saga';
import {GraphEdge, GraphNode, GraphOptions} from '@src/infrastructure/vis/model/network';
import {Translator} from '@service/translations/translator.service';
import {CpgGraphComponent} from '@app/shared/components/cpg-graph.component';

@Component({
  imports: [
    CpgGraphComponent
  ],
  template: `
    <div class="container mx-auto flex flex-col">
      <cpg-graph class="flex-grow h-full w-full" [nodes]="nodes" [edges]="edges" [options]="options"></cpg-graph>
    </div>
  `,
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
              private readonly sagaApi: SagaApi,
              private readonly translator: Translator,
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
    this.subscribe(this.guideControl.valueChanges, () => this.regenerateNetworkParameters());

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
    const guide = this.guides.find(guide => guide.id === this.guideControl.value);
    if (!guide)
      return;

    this.nodes = this.books.map(book => {
      return {
        id: book.id,
        label: this.translator.translate(book.title),
        group: this.getSagaFromBook(book),
        score: 20,
      }
    });
    if (guide.order.find(edge => edge.type === 'start'))
      this.nodes.push({
        id: 'start',
        label: this.translator.translate('Start'),
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
    console.log('guides', guides)
    if (!guides || guides.length === 0) return;
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
