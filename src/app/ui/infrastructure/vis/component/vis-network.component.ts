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
import {BaseComponent} from '../../../shared/components/base.component';
import {DataSet, Network} from 'vis';
import {GraphEdge, GraphNode} from '../model/network';

@Component({
  selector: 'vis-network',
  template: '<div class="flex w-full h-full" #network></div>',
  encapsulation: ViewEncapsulation.None
})

export class VisNetworkComponent extends BaseComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('network') el: ElementRef;
  @Input()
  nodes: GraphNode[];
  @Input()
  edges: GraphEdge[];
  @Input()
  options= {
    locale: 'es',
    physics: {
      enabled: true,
    },
    interaction: {
      dragNodes: false,
    },
    layout: {
      randomSeed: 5683756,
    },
    edges: {
      scaling: {
        min: 1,
        max: 1,
        label: {
          enabled: true,
          min: 3,
          max: 30,
          maxVisible: 30,
          drawThreshold: 5
        },
      },
    }
  };

  networkInstance: Network;

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
    this.networkInstance.setOptions(this.options);
  }

  setGraphData() {
    const nodes = new DataSet<any>(this.nodes);
    const edges = new DataSet<any>(this.edges);
    this.networkInstance.setData({nodes: nodes, edges: edges});
  }
}
