import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {BaseComponent} from './base.component';
import {DataSet, Network} from 'vis';
import {GraphEdge, GraphNode} from '../../../../domain/model/network';

@Component({
  selector: 'graph',
  template: '<div #network></div>',
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent extends BaseComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('network') el: ElementRef;
  @Input()
  nodes: GraphNode[];
  @Input()
  edges: GraphEdge[];
  @Input()
  options?: any;

  networkInstance: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setGraphData();
  }

  ngAfterViewInit() {
    const nodes = new DataSet<any>(this.nodes);
    const edges = new DataSet<any>(this.edges);
    this.networkInstance = new Network(this.el.nativeElement, {nodes, edges}, {});
  }

  setGraphData() {
    const nodes = new DataSet<any>(this.nodes);
    const edges = new DataSet<any>(this.edges);
    this.networkInstance.setData({nodes: nodes, edges: edges});
  }
}
