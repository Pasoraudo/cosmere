import {AfterViewInit, Component, Input, OnChanges} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';
import * as d3 from 'd3';
import {uuid} from '../../../../../domain/function/uuid.helper';
import {delay} from 'rxjs';
import {GraphEdge, GraphNode, GraphOptions} from '../../vis/model/network';

@Component({
  selector: 'd3-network',
  template: `
    <div class="svg-container w-full">
      <div class="h-full w-full" id="{{ id }}-network"></div>
    </div>
  `
  ,
  styles: [`
    .svg-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .svg-container svg {
      max-width: 100%;
      max-height: 100%;
    }
  `],
})
export class D3NetworkComponent extends BaseComponent implements AfterViewInit, OnChanges {
  @Input()
  nodes: GraphNode[] = []
  @Input()
  edges: GraphEdge[] = [];
  @Input()
  options: GraphOptions;
  @Input()
  width: number = window.screen.availWidth;
  @Input()
  height: number = window.screen.availHeight;
  characterLinks: GraphEdge[] = [];

  id = uuid();
  private element: HTMLElement;
  private groups: string[] = [];
  private color: d3.ScaleOrdinal<string, string, never>;
  private svg;
  private g;
  private simulation;
  private link;
  private node;

  constructor() {
    super();
  }

  ngOnChanges(): void {
    if (this.nodes.length > 0 && this.edges.length > 0)
      this.create();
  }

  ngAfterViewInit(): void {
    if (this.nodes.length > 0 && this.edges.length > 0)
      this.create();
  }

  create(): void {
    this.element = document.getElementById(this.id + '-network');
    const boundingRect = this.element.getBoundingClientRect();
    this.width = boundingRect.width;
    this.height = boundingRect.height;
    d3.select(this.element).selectChildren().remove();

    this.createCharacterLinks();
    this.initializeColor();
    this.createSvg();
    this.createLink();
    this.createSimulation();
    this.createNode();
  }

  initializeColor(): void {
    this.groups = Array.from(new Set(this.characterLinks.map(graphEdge => graphEdge.group)));
    if (this.options.nodeColors)
      this.color = d3.scaleOrdinal(Object.keys(this.options.nodeColors), Object.values(this.options.nodeColors));
    else
      this.color = d3.scaleOrdinal(this.groups, d3.schemeCategory10);
  }

  createCharacterLinks(): void {
    const characters = this.nodes.map(c => c.id);
    this.characterLinks = this.edges.filter(link => characters.includes(link.source) && characters.includes(link.target))
  }

  createSimulation(): void {
    // @ts-ignore
    this.simulation = d3.forceSimulation(this.nodes) // @ts-ignore
      .force("link", d3.forceLink(this.characterLinks).distance(20).id(this.getId)) // @ts-ignore
      .force("charge", d3.forceManyBody().strength(d => d.score * (-100)))
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))// @ts-ignore
      .force("radius", d3.forceCollide(d => d.score + 20))
      .force('cluster', this.cluster(this.nodes))
      .on("tick", () => {
        if (this.options.curveEdges)
          this.link.attr("d", this.linkArc);
        else
          this.link.attr("d", d => {
            return `
            M${d.source.x},${d.source.y}
            A${this.options.edgeWidth},${this.options.edgeWidth} 0 0, 1 ${d.target.x},${d.target.y}
            `;
          });
        this.node.attr("transform", d => `translate(${d.x}, ${d.y})`);
        delay(10000);
      });

    setTimeout(() => {
      this.simulation.stop();
    }, 10000);
  }

  createSvg() {
    const _this = this;
    this.svg = d3.create("svg")
      .attr("viewBox", [0, 0, this.width, this.height])
      .style("font", "12px sans-serif")

    this.g = this.svg.append("g");

    if (this.options.zoom)
      this.svg.call(d3.zoom()
        .extent([[0, 0], [this.width, this.height]])
        .on("zoom", zoomed));

    function zoomed({transform}) {
      _this.g.attr("transform", transform);
    }

    this.element.append(this.svg.node());

    this.svg.attr("width", this.width)
      .attr("height", this.height);

    if (this.options.directed)
      this.svg.append("defs").selectAll("marker")
        .data(this.groups)
        .join("marker")
        .attr("id", d => `arrow-${d}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 30)
        .attr("refY", -5)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("orient", "auto")
        .append("path")
        .attr("fill", this.color)
        .attr("d", "M0,-5L10,0L0,5");
  }

  createLink(): void {
    this.link = this.g.append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(this.characterLinks)
      .join("path")
      .attr("stroke", d => this.color(d.group))
      .attr("marker-end", d => `url(${new URL(`#arrow-${d.group}`, location.toString())})`);
  }

  createNode() {
    this.node = this.g.append("g")
      .attr("fill", "currentColor")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .selectAll("g")
      .data(this.nodes)
      .join("g");
    if (this.options.drag)
      this.node.call(this.drag(this.simulation));

    this.node
      .append("circle")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("r", d => d.score)
      .style("fill", d => this.color(d.group));

    this.node.append("text")
      .text(d => d.label !== '' ? d.label : d.id)
      .style("font-size", "1rem")
      .style("color", "white")
      .style("text-anchor", "middle")
      .style("dominant-baseline", "central");
  }

  getId(d) {
    return d.id;
  }

  drag(simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  cluster(nodes) {
    const strength = 0.7; // Fuerza de agrupamiento

    function force(alpha) {
      for (const node of nodes) {
        const clusterNodes = nodes.filter(d => d.group === node.group);
        const x = clusterNodes.reduce((acc, curr) => acc + curr.x, 0) / clusterNodes.length;
        const y = clusterNodes.reduce((acc, curr) => acc + curr.y, 0) / clusterNodes.length;
        node.vx += (x - node.x) * alpha * strength;
        node.vy += (y - node.y) * alpha * strength;
      }
    }

    return force;
  }

  linkArc(d) {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
  }
}

