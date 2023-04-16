import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {BaseComponent} from './base.component';
import {DataSet, Network} from 'vis';
import {GraphEdge, GraphNode} from '../../../../domain/model/network';
import {Observable} from 'rxjs';

@Component({
  selector: 'graph',
  template: '<div #network></div>',
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('network') el: ElementRef;
  @Input()
  nodes$: Observable<GraphNode[]>;
  @Input()
  edges$: Observable<GraphEdge[]>;
  @Input()
  options?: any;

  networkInstance: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const nodes = new DataSet<any>([]);
    const edges = new DataSet<any>([]);
    this.networkInstance = new Network(this.el.nativeElement, {nodes, edges}, {});

    this.nodes$.subscribe(graphNodes => {
      console.log('child', graphNodes);
      if (this.networkInstance === undefined)
        return;
      const nodes = new DataSet<any>(graphNodes);
      const edges = new DataSet<any>([]);
      this.networkInstance.setData({nodes: nodes});
    });
    this.edges$.subscribe(graphNodes => {
      if (this.networkInstance === undefined)
        return;
      const edges = new DataSet<any>(graphNodes);
      //this.networkInstance.setData({edges: edges});
    });
  }
}
