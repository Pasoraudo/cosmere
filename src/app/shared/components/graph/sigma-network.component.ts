import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {GraphEdge, GraphNode, GraphOptions} from '@src/infrastructure/vis/model/network';
import {BaseComponent} from '../base.component';
import Sigma from 'sigma';
import Graph from 'graphology';
import * as d3 from 'd3';
import {Simulation, SimulationNodeDatum} from 'd3';
import {EdgeDisplayData, NodeDisplayData} from 'sigma/types';


interface State {
  hoveredNode?: string;
  searchQuery: string;
  selectedNode?: string;
  suggestions?: Set<string>;
  hoveredNeighbors?: Set<string>;
}

@Component({
  selector: 'sigma-network',
  standalone: true,
  template: '<div class="w-full h-full flex" #network style="height: 700px"></div>',
})

export class SigmaNetworkComponent extends BaseComponent {
  @ViewChild('network') el!: ElementRef;
  @Input()
  nodes!: GraphNode[];
  @Input()
  edges!: GraphEdge[];
  @Input()
  options!: GraphOptions;
  @Input()
  colors!: {
    node: d3.ScaleOrdinal<string, string, never>,
    edge: d3.ScaleOrdinal<string, string, never>
  };

  sigma!: Sigma;
  graph!: Graph;
  state: State = {searchQuery: ""};

  simulation!: Simulation<any, any>;

  constructor() {
    super();
  }

  override onChanges(): void {
    super.onChanges();
    if (!this.el)
      return;

    this.renderGraph();
  }

  override onAfterViewInit(): void {
    super.onAfterViewInit();
    if (!this.el)
      return;

    this.renderGraph();
  }

  override onDestroy(): void {
    super.onDestroy()
    this.destroyGraph();
  }

  destroyGraph(): void {
    if (this.sigma)
      this.sigma.kill();
    if (this.simulation)
      this.simulation.stop();
  }

  renderGraph(): void {
    this.destroyGraph();

    this.createGraph();
    if (!this.graph) return;
    console.log('this.graph', this.graph);
    this.sigma = new Sigma(this.graph, this.el.nativeElement, {
      renderLabels: true,
      labelColor: {
        color: '#FFFFFF'
      },
    });
    if (this.options.hover)
      this.hoverNeighbors();
    this.startSimulation();
  }

  createGraph(): void {
    this.graph = new Graph();
    this.nodes.forEach(node =>
      this.graph.addNode(node.id, {label: node.label, size: node.score, color: this.colors.node(node.group)})
    );
    const edgeType = this.options.directed ? 'arrow' : 'line';
    this.edges.forEach(edge => {
        this.graph.addEdge(edge.source, edge.target, {
          size: this.options.edgeWidth,
          type: edgeType,
          color: this.colors.edge(edge.group ?? '')
        });
      }
    );

    this.nodes.forEach((node: any, i) => {
      const angle = (i * 2 * Math.PI) / this.graph.order;

      node.x = 100 * Math.cos(angle);
      node.y = 100 * Math.cos(angle);

      const graphNode = this.graph.findNode((nodeId, attributes) => nodeId === node.id);
      this.graph.setNodeAttribute(graphNode, 'x', node.x);
      this.graph.setNodeAttribute(graphNode, 'y', node.y);
    });
    console.log('this.nodes', this.nodes);
    // circular.assign(this.graph)
  }

  startSimulation(): void {
    const _this = this;
    const nodes: SimulationNodeDatum[] = this.nodes as SimulationNodeDatum[];
    this.simulation = d3.forceSimulation(nodes)
      .force("center", d3.forceCenter(0, 0).strength(0.1))// @ts-ignore
      .force("charge", d3.forceManyBody().strength(d => d.score * (-100))) // @ts-ignore
      .force("link", d3.forceLink(this.edges).id(this.getId)) // @ts-ignore
      .force('cluster', this.cluster()) // @ts-ignore
      .force("radius", d3.forceCollide(d => d.score * 30))
      .on("tick", () => {
        _this.graph.nodes().forEach((graphNode, i) => {
          const node: GraphNode = _this.nodes[i];
          _this.graph.setNodeAttribute(graphNode, "x", node.x);
          _this.graph.setNodeAttribute(graphNode, "y", node.y);
        });
      })
      .on("end", () => _this.simulation.restart());
    this.simulation.restart();
  }

  hoverNeighbors(): void {
    this.sigma.on("enterNode", ({node}) => {
      this.setHoveredNode(node);
    });
    this.sigma.on("leaveNode", () => {
      this.setHoveredNode(undefined);
    });

    this.sigma.setSetting("nodeReducer", (node, data) => {
      const res: Partial<NodeDisplayData> = {...data};

      if (this.state.hoveredNeighbors && !this.state.hoveredNeighbors.has(node) && this.state.hoveredNode !== node) {
        res.label = "";
        res.size = 0;
        res.color = "none";
      }

      if (this.state.selectedNode === node) {
        res.highlighted = true;
      } else if (this.state.suggestions && !this.state.suggestions.has(node)) {
        res.label = "";
        res.size = 0;
        res.color = "none";
      }

      return res;
    });

    this.sigma.setSetting("edgeReducer", (edge, data) => {
      const res: Partial<EdgeDisplayData> = {...data};
      if (this.state.hoveredNode && !this.graph.hasExtremity(edge, this.state.hoveredNode))
        res.hidden = true;
      if (this.state.suggestions && (!this.state.suggestions.has(this.graph.source(edge)) || !this.state.suggestions.has(this.graph.target(edge))))
        res.hidden = true;

      return res;
    });
  }

  cluster() {
    const strength = 0.7;
    const clusterStrength = this.options.clusterRepulsion ? 1 : 0;
    const _this = this;

    return force;

    function force(alpha: any) {
      const clusterCenters: Record<any, any> = {};

      _this.nodes.forEach(node => {
        let clusterCenter = clusterCenters[node.group];
        if (!clusterCenter) {
          clusterCenter = {x: 0, y: 0, count: 0};
        }

        clusterCenter.x += node.x;
        clusterCenter.y += node.y;
        clusterCenter.count += 1;
      });

      _this.nodes.forEach(node => {
        if (!node.vx || !node.vy || !node.x || !node.y) return;

        const clusterCenter = clusterCenters[node.group];
        if (clusterCenter) {
          const centerX = clusterCenter.x / clusterCenter.count;
          const centerY = clusterCenter.y / clusterCenter.count;
          node.vx += (centerX - node.x) * alpha * clusterStrength;
          node.vy += (centerY - node.y) * alpha * clusterStrength;
        }

        const clusterNodes = _this.nodes.filter(d => d.group === node.group);
        const x = clusterNodes.reduce((acc, curr) => acc + (curr?.x ?? 0), 0) / clusterNodes.length;
        const y = clusterNodes.reduce((acc, curr) => acc + (curr?.y ?? 0), 0) / clusterNodes.length;
        node.vx += (x - node.x) * alpha * strength;
        node.vy += (y - node.y) * alpha * strength;
      });
    }
  }

  getId(d: any) {
    return d.id;
  }

  setHoveredNode(node?: string) {
    if (node) {
      this.state.hoveredNode = node;
      this.state.hoveredNeighbors = new Set(this.graph.neighbors(node));
    } else {
      this.state.hoveredNode = undefined;
      this.state.hoveredNeighbors = undefined;
    }

    this.sigma.refresh();
  }

  clamp(value: any, min: any, max: any) {
    return Math.min(Math.max(value, min), max);
  }
}
