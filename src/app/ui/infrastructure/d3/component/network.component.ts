import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';
import * as d3 from 'd3';
import {D3Link, D3Node} from '../../vis/model/network';
import {uuid} from '../../../../../domain/function/uuid.helper';

@Component({
  selector: 'd3-network',
  template: '<div class="flex flex-1" id="{{ id }}-network"></div>',
})
export class D3NetworkComponent extends BaseComponent implements AfterViewInit, OnChanges {
  @Input()
  nodes: D3Node[] = []
  @Input()
  links: D3Link[] = [];
  @Input()
  width: number = window.screen.availWidth;
  @Input()
  height: number = window.screen.availHeight;
  characterLinks: D3Link[] = [];

  protected id = uuid();
  private element: HTMLElement;
  private groups: string[] = [];
  private color;
  private svg;
  private g;
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
    this.element = document.getElementById(this.id + '-network');
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
    this.color = d3.scaleOrdinal(this.groups, d3.schemeCategory10);
  }

  createCharacterLinks(): void {
    const characters = this.nodes.map(c => c.id);
    this.characterLinks = this.links.filter(link => characters.includes(link.source) && characters.includes(link.target))
  }

  createSimulation(): void {
    // @ts-ignore
    this.simulation = d3.forceSimulation(this.nodes) // @ts-ignore
      .force("link", d3.forceLink(this.characterLinks).id(this.getId)) // @ts-ignore
      .force("charge", d3.forceManyBody().strength(d => d.score * (-15)))
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))// @ts-ignore
      .force("radius", d3.forceCollide(d => d.score + 20))
      .on("tick", () => {
        this.link.attr("d", this.linkArc);
        this.node.attr("transform", d => `translate(${d.x}, ${d.y})`);
      });
  }

  createSvg() {
    const _this = this;
    this.svg = d3.create("svg")
      .attr("viewBox", [0, 0, this.width, this.height])
      .style("font", "12px sans-serif")

    this.g = this.svg.append("g");
    this.svg.call(d3.zoom()
      .extent([[0, 0], [this.width, this.height]])
      .on("zoom", zoomed));

    function zoomed({transform}) {
      _this.g.attr("transform", transform);
    }

    this.element.append(this.svg.node());

    this.svg.attr("width", this.width)
      .attr("height", this.height);

    this.svg.append("defs").selectAll("marker")
      .data(this.groups)
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
    this.link = this.g.append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(this.characterLinks)
      .join("path")
      .attr("stroke", d => this.color(d.type));
  }

  createNode() {
    this.node = this.g.append("g")
      .attr("fill", "currentColor")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .selectAll("g")
      .data(this.nodes)
      .join("g")
      .call(this.drag(this.simulation));

    this.node
      .append("circle")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("r", d => d.score)
      .style("fill", d => this.color(d.group));

    this.node.append("text")
      .text(d => d.label)
      .style("font-size", "1rem")
      .style("color", "white")
      .style("text-anchor", "middle")
      .style("dominant-baseline", "central");
  }

  private getId(d) {
    return d.id;
  }

  private linkArc(d) {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
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

