import {AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';
import {DataSet, Network} from 'vis';
import {GraphEdge, GraphNode} from '../model/network';

@Component({
  selector: 'vis-network',
  template: '<div class="flex w-full h-full" #network></div>',
  encapsulation: ViewEncapsulation.None
})

export class VisNetworkComponent extends BaseComponent implements OnChanges, AfterViewInit {
  @ViewChild('network') el: ElementRef;
  @Input()
  nodes: GraphNode[];
  @Input()
  edges: GraphEdge[];
  @Input()
  options = {
    locale: 'es',
    physics: {
      enabled: true,
    },
    interaction: {
      dragNodes: true,
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
      arrows: {
        to: {enabled: true, scaleFactor: 1, type: "arrow"}
      }
    }
  };

  networkInstance: Network;

  constructor() {
    super();
  }

  ngOnChanges() {
    this.setGraphData();
  }

  ngAfterViewInit() {
    this.setGraphData();
  }

  setGraphData() {
    if (!this.el?.nativeElement)
      return;
    const nodes = new DataSet<any>(this.nodes);
    const edges = new DataSet<any>(this.edges.map(edge => {
      return {
        from: edge.source,
        to: edge.target
      }
    }));
    if (this.networkInstance)
      this.networkInstance.destroy();


    this.networkInstance = new Network(this.el.nativeElement, {nodes, edges}, {});
    this.networkInstance.setData({nodes: nodes, edges: edges});
    this.networkInstance.setOptions(this.options);

  }
}
