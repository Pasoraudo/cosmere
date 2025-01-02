import {AfterViewInit, Component, Input, OnChanges} from "@angular/core";
import {BaseComponent} from "./base.component";
import {uniqBy, uniqWith} from "lodash-es";
import * as d3 from "d3";
import {GraphEdge, GraphNode, GraphOptions,} from "@src/infrastructure/vis/model/network";
import {SigmaNetworkComponent} from '@app/shared/components/graph/sigma-network.component';

@Component({
  selector: "cpg-graph",
  imports: [
    SigmaNetworkComponent
  ],
  template: `
    <sigma-network class="flex h-full w-full" [nodes]="filteredNodes"
                   [edges]="filteredEdges"
                   [options]="options" [colors]="colors"></sigma-network>
  `,
})
export class CpgGraphComponent
  extends BaseComponent
  implements OnChanges, AfterViewInit {
  @Input()
  nodes!: GraphNode[];
  @Input()
  edges!: GraphEdge[];
  @Input()
  options!: GraphOptions;

  defaultOptions: GraphOptions = {
    zoom: true,
    directed: false,
    drag: false,
    curveEdges: false,
    hover: true,
    clusterRepulsion: true,
    edgeWidth: 1,
  };

  filteredNodes!: GraphNode[];
  filteredEdges!: GraphEdge[];
  colors!: {
    node: d3.ScaleOrdinal<string, string, never>;
    edge: d3.ScaleOrdinal<string, string, never>;
  };

  constructor() {
    super();
  }

  override onAfterViewInit(): void {
    super.onAfterViewInit();
    this.setParameters();
  }

  override onChanges(): void {
    super.onChanges();
    this.setParameters();
  }

  setParameters(): void {
    this.options = {...this.defaultOptions, ...this.options};
    this.filterParameters();
    this.initializeColor();
  }

  filterParameters(): void {
    this.filteredNodes = uniqBy(this.nodes, (node) => node.id);
    this.filteredEdges = uniqWith(
      this.edges.filter((edge) => {
        const nodeIds = this.nodes.map((node) => node.id);
        return nodeIds.includes(edge.source) && nodeIds.includes(edge.target);
      }),
      (edge1, edge2) => {
        return (
          (edge1.source === edge2.source && edge1.target === edge2.target) ||
          (edge1.source === edge2.target && edge1.target === edge2.source)
        );
      },
    );
  }

  initializeColor(): void {
    const nodeGroups = Array.from(
      new Set(this.nodes.map((graphNode) => graphNode.group)),
    );
    const nodeColors = d3.scaleOrdinal(
      nodeGroups,
      d3.schemeCategory10.slice(0, nodeGroups.length),
    );
    if (this.options?.nodeColors) {
      Object.entries(this.options.nodeColors).forEach(([key, _]) => {
        const index = nodeColors.domain().findIndex((group) => group === key);
        if (index < 0) return;

        const range = nodeColors.range();
        range[index] = this.options.nodeColors
          ? this.options.nodeColors[key]
          : "#000000";
        nodeColors.range(range);
      });
    }

    const edgeGroups = Array.from(
      new Set(this.edges.map((graphEdge) => graphEdge.group)),
    ).filter((e) => e !== undefined);
    let edgeColors = d3.scaleOrdinal(
      edgeGroups,
      d3.schemeCategory10.slice(0, nodeGroups.length),
    );
    if (this.options.edgeColors)
      edgeColors = d3.scaleOrdinal(
        Object.keys(this.options.edgeColors),
        Object.values(this.options.edgeColors),
      );

    this.colors = {
      node: nodeColors,
      edge: edgeColors,
    };
  }
}
