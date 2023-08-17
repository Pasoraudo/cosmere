import {AfterViewInit, Component, Input, OnChanges, ViewEncapsulation} from '@angular/core';
import {BaseComponent} from './base.component';
import {GraphEdge, GraphNode, GraphOptions} from '../../infrastructure/vis/model/network';
import {uniqBy, uniqWith} from 'lodash-es';
import * as d3 from 'd3';

@Component({
  selector: 'app-network',
  template: `
    <sigma-network class="w-full relative" [nodes]="filteredNodes" [edges]="filteredEdges"
                   [options]="options" [colors]="colors"></sigma-network>
  `,
  encapsulation: ViewEncapsulation.None
})

export class AppNetworkComponent extends BaseComponent implements OnChanges, AfterViewInit {
  @Input()
  nodes: GraphNode[];
  @Input()
  edges: GraphEdge[];
  @Input()
  options: GraphOptions;

  defaultOptions: GraphOptions = {
    zoom: true,
    directed: false,
    drag: false,
    curveEdges: false,
    hover: true,
    clusterRepulsion: true,
    edgeWidth: 1,
  };

  filteredNodes: GraphNode[];
  filteredEdges: GraphEdge[];
  colors: {
    node: d3.ScaleOrdinal<string, string, never>,
    edge: d3.ScaleOrdinal<string, string, never>
  };

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.setParameters();
  }

  ngOnChanges(): void {
    this.setParameters();
  }

  setParameters(): void {
    this.options = {...this.defaultOptions, ...this.options};
    this.filterParameters();
    this.initializeColor();
  }

  filterParameters(): void {
    this.filteredNodes = uniqBy(this.nodes, node => node.id);
    this.filteredEdges = uniqWith(this.edges.filter(edge => {
        const nodeIds = this.nodes.map(node => node.id);
        return nodeIds.includes(edge.source) && nodeIds.includes(edge.target)
      }), (edge1, edge2) => {
        return (edge1.source === edge2.source && edge1.target === edge2.target) ||
          (edge1.source === edge2.target && edge1.target === edge2.source)
      }
    );
  }

  initializeColor(): void {
    const nodeGroups = Array.from(new Set(this.nodes.map(graphNode => graphNode.group)));
    let nodeColors = d3.scaleOrdinal(nodeGroups, d3.schemeCategory10.slice(0, nodeGroups.length));
    if (this.options?.nodeColors) {
      Object.entries(this.options.nodeColors).forEach(([key, value]) => {
        const index = this.colors.node.domain().findIndex(group => group === key);
        if (index < 0)
          return;

        const range = this.colors.node.range();
        range[index] = this.options.nodeColors[key];
        nodeColors.range(range);
      });
    }

    const edgeGroups = Array.from(new Set(this.edges.map(graphEdge => graphEdge.group)));
    let edgeColors = d3.scaleOrdinal(edgeGroups, d3.schemeCategory10.slice(0, nodeGroups.length));
    if (this.options.edgeColors)
      edgeColors = d3.scaleOrdinal(Object.keys(this.options.edgeColors), Object.values(this.options.edgeColors));

    this.colors = {
      node: nodeColors,
      edge: edgeColors
    };
  }
}
