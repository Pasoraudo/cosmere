import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';
import * as d3 from 'd3';
import {D3Link, GraphNode} from '../../vis/model/network';

@Component({
  selector: 'd3-network',
  template: '<div class="flex flex-1" id="network"></div>',
})
export class D3NetworkComponent extends BaseComponent implements AfterViewInit, OnChanges {
  @Input()
  nodes: GraphNode[] = []
  @Input()
  links: D3Link[] = [];


  characterLinks: D3Link[] = [];
  width: number = 1400;
  height: number = 800;

  private edgeGroups: string[] = []
  private color;
  private svg;
  private simulation;
  private link;
  private node;


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
    d3.select('#network').selectChildren().remove();
    this.createCharacterLinks();
    this.initializeColor();
    this.createSimulation();
    this.createSvg();
    this.createLink();
    this.createNode();
  }

  initializeColor(): void {
    this.edgeGroups = Array.from(new Set(this.characterLinks.map(graphEdge => graphEdge.group)));
    this.color = d3.scaleOrdinal(this.edgeGroups, d3.schemeCategory10);
  }

  createCharacterLinks(): void {
    const characters = this.nodes.map(c => c.id);
    this.characterLinks = this.links.filter(link => characters.includes(link.source) && characters.includes(link.target))
  }
  createSimulation(): void {
    // @ts-ignore
    this.simulation = d3.forceSimulation(this.nodes) // @ts-ignore
      .force("link", d3.forceLink(this.characterLinks).id(this.id)) // @ts-ignore
      .force("charge", d3.forceManyBody().strength(d => d.score * (-3)))
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))// @ts-ignore
      .force("radius", d3.forceCollide(d => d.score + 20))
      .on("tick", () => {
        this.link.attr("d", this.linkArc);
        this.node.attr("transform", d => `translate(${d.x}, ${d.y})`);
      });
  }

  createSvg() {
    this.svg = d3.select("#network")
      .append("svg")
      .attr("viewBox", [0, 0, this.width, this.height])
      .style("font", "12px sans-serif");

    this.svg.attr("width", this.width)
      .attr("height", this.height);

    this.svg.append("defs").selectAll("marker")
      .data(this.edgeGroups)
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
      .data(this.characterLinks)
      .join("path")
      .attr("stroke", d => this.color(d.type))
  }

  createNode() {
    this.node = this.svg.append("g")
      .attr("fill", "currentColor")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .selectAll("g")
      .data(this.nodes)
      .join("g")
      .call(this.drag(this.simulation));

    this.node.append("circle")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("r", d => d.score)
      .style("fill", "#FF2121")

    this.node.append("text")
      .text(d => d.label)
      .style("font-size", "1rem")
      .style("color", "white")
      .style("text-anchor", "middle")
      .style("dominant-baseline", "central");
  }

  private linkArc(d) {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
  }

  private id(d) {
    return d.id;
  }

  private drag(simulation) {

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
}

