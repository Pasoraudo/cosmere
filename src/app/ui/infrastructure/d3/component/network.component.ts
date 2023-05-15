import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';
import * as d3 from 'd3';

@Component({
  selector: 'd3-network',
  template: '<div class="flex flex-1" id="network"></div>',
})
export class D3NetworkComponent extends BaseComponent implements AfterViewInit, OnChanges {
  @Input()
  nodes: any[] = []
  @Input()
  links: any[] = [];
  private width: number = 1000;
  private height: number = 800;
  private simulation;
  private link;
  private svg;
  private node;
  private margin = {top: 0, right: 0, bottom: 0, left: 0}
  private types = ["licensing", "suit", "resolved"]
  private color = d3.scaleOrdinal(this.types, d3.schemeCategory10);

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.nodes.length > 0 && this.links.length > 0)
      this.create();
  }

  ngAfterViewInit(): void {
    if (this.nodes.length > 0 && this.links.length > 0)
      this.create();
  }

  create(): void {
    this.types = Array.from(new Set(this.links.map(d => d.type)));
    this.createSimulation();
    this.createSvg();
    this.createLink();
    this.createNode();
  }

  createSimulation(): void {
    this.simulation = d3.forceSimulation(this.nodes)
      .force("link", d3.forceLink(this.links).id(this.id))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))
      .on("tick", () => {
        this.link.attr("d", this.linkArc);
        this.node.attr("transform", d => `translate(${d.x},${d.y})`);
      });
  }

  createSvg() {
    this.svg = d3.select("#network")
      .append("svg")
      .attr("viewBox", [0, 0, this.width, this.height])
      .style("font", "12px sans-serif");

    this.svg.attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.svg.append("defs").selectAll("marker")
      .data(this.types)
      .join("marker")
      .attr("id", d => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -0.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", this.color)
      .attr("d", "M0,-5L10,0L0,5");
  }

  createLink(): void {
    this.link = this.svg.append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(this.links)
      .join("path")
      .attr("stroke", d => this.color(d.type))
  }

  createNode() {
    this.node = this.svg
      .selectAll("circle")
      .data(this.nodes)
      .enter()
      .append("circle")
      .attr("r", 20)
      .style("fill", "#69b3a2")
  }

  linkArc(d) {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
  }

  id(d) {
    return d.id;
  }
}

