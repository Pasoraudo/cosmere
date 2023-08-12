import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BasePage} from '../../../shared/page/base.page';
import {GuideApi} from '../../../../../domain/service/api/guide.api';
import {BookApi} from '../../../../../domain/service/api/book.api';
import {D3Link, D3Node, D3Options} from '../../../infrastructure/vis/model/network';
import {Book} from '../../../../../domain/model/book';
import {Guide} from '../../../../../domain/model/guide';
import {defer} from 'lodash';

@Component({
  selector: 'network',
  templateUrl: './guide.page.html',
  encapsulation: ViewEncapsulation.None
})
export class GuidePage extends BasePage implements OnInit {
  nodes: D3Node[] = [];
  edges: D3Link[] = [];
  books: Book[] = [];
  guides: Guide[] = [];
  options: D3Options = {
    directed: true,
    drag: true
  }
  constructor(private bookApi: BookApi, private guideApi: GuideApi) {
    super();
  }

  async ngOnInit() {
    this.subscribe(this.bookApi.allBooks(), books => {
      this.onBooksChanged(books);
    });
    this.subscribe(this.guideApi.allGuides(), relationships => {
      this.onGuidesChanged(relationships);
    });

    defer(async () => {
      await this.bookApi.fetchAllBooks();
      await this.guideApi.fetchAllGuides();
    });
  }

  regenerateNetworkParameters(): void {
    if (this.guides.length === 0)
      return;
    if (this.books.length === 0)
      return;

    console.log(this.guides)
    const guide: Guide = this.guides[0];
    this.nodes = this.books.map(book => {
      return {
        id: book.id,
        label: book.title,
        group: "",
        score: 10,
      }
    })
    this.edges = guide.order.map(guideRelationship => {
      return {
        source: guideRelationship.sourceId,
        target: guideRelationship.targetId,
        weight: 1,
        group: guideRelationship.type,
      }
    });
  }

  onBooksChanged(books: Book[]) {
    this.books = books;
    this.regenerateNetworkParameters();
  }

  onGuidesChanged(guides: Guide[]) {
    this.guides = guides;
    this.regenerateNetworkParameters();
  }
}
