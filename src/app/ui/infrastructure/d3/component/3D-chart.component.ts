import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';
import * as d3 from 'd3';
import {uuid} from '../../../../../domain/function/uuid.helper';
import {Legend} from '../function/legend.helper';

export interface Chart3DItem {
  label: string;
  x: number;
  y: number;
  z: number;
}

@Component({
  selector: 'chart-3d',
  template: `
    <div class="flex flex-row">
      <div id="{{id}}-chart-3d"></div>
      <div class="flex flex-1 items-end pb-10" id="{{id}}-legend-bar"></div>
    </div>
  `,
})
export class Chart3DComponent extends BaseComponent implements AfterViewInit, OnChanges {
  @Input()
  data: Chart3DItem[];
  @Input()
  xLabel: string = '';
  @Input()
  yLabel: string = '';
  @Input()
  private config: { [name: string]: any } = {
    height: 500,
    width: 500,
    margin: {
      top: 20,
      left: 40,
      right: 30,
      bottom: 30
    },
    inset: {
      top: 6,
      right: 6,
      bottom: 6,
      left: 6,
    },
    dot: {
      radius: 20,
      strokeWidth: 0,
      strokeColor: "white",
    },
    domain: {
      x: [0.3, 1],
      y: [0.3, 1]
    },
    padding: 10,
    animationDuration: 300,
    ticksInterval: 10,
    color: d3.interpolateCool
  };

  id: string = uuid();
  private element: HTMLElement;
  private legendElement: HTMLElement;
  private X: number[];
  private Y: number[];
  private Z: number[];
  private labels: string[];
  private svg: any;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  private color;
  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.create();
  }

  ngAfterViewInit(): void {
    this.create();
  }

  public create() {
    if (!this.data || this.data.length === 0)
      return;

    this.element = document.getElementById(this.id + "-chart-3d");

    this.initValues();
    this.createColorBar();
    this.initScales();
    this.createAxis();
    this.createSvg();
  }

  private createColorBar(): void {
    // @ts-ignore
    const legend = Legend({
      color: d3.scaleSequential([0, 1], this.color),
      title: "Degree"
    })


    this.legendElement = document.getElementById(this.id + "-legend-bar");
    if (!this.legendElement)
      return;

    d3.select(this.legendElement).select('svg').remove()
    this.legendElement.append(legend);
  }

  private initValues() {
    this.color = this.config.color;
    this.X = this.data.map(e => e.x);
    this.Y = this.data.map(e => e.y);
    this.Z = this.data.map(e => e.z);
    this.labels = this.data.map(e => e.label);
  }

  private initScales() {
    const xRange = [this.config.margin.left + this.config.inset.left, this.config.width - this.config.margin.right - this.config.inset.right];
    const yRange = [this.config.height - this.config.margin.bottom - this.config.inset.bottom, this.config.margin.top + this.config.inset.top];

    this.xScale = d3.scaleLinear(this.config.domain.x, xRange);
    this.yScale = d3.scaleLinear(this.config.domain.y, yRange);
  }

  private createAxis() {
    this.xAxis = d3.axisBottom(this.xScale).ticks(this.config.width / 80);
    this.yAxis = d3.axisLeft(this.yScale).ticks(this.config.height / 50);
  }

  private createSvg(): void {
    const el = d3.select(this.element)
    el.select('svg').remove()
    this.svg = d3.select(this.element)
      .append("svg")
      .attr("width", this.config.width)
      .attr("height", this.config.height)
      .attr("viewBox", [0, 0, this.config.width, this.config.height])
      .attr("style", "max-width: 100%; this.options.height: auto; height: intrinsic;");

    this.svg.append("g")
      .attr("transform", `translate(0,${this.config.height - this.config.margin.bottom})`)
      .call(this.xAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("y2", this.config.margin.top + this.config.margin.bottom - this.config.height)
        .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
        .attr("x", this.config.width)
        .attr("y", this.config.margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text(this.xLabel));

    this.svg.append("g")
      .attr("transform", `translate(${this.config.margin.left},0)`)
      .call(this.yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", this.config.width - this.config.margin.left - this.config.margin.right)
        .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
        .attr("x", -this.config.margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(this.yLabel));


    const I = d3.range(this.X.length).filter(i => !isNaN(this.X[i]) && !isNaN(this.Y[i]));


    this.svg.append("g")
      .attr("stroke", this.config.dot.strokeColor)
      .attr("stroke-width", this.config.dot.strokeWidth)
      .selectAll("circle")
      .data(I)
      .join("circle")
      .attr("cx", i => this.xScale(this.X[i]))
      .attr("cy", i => this.yScale(this.Y[i]))// @ts-ignore
      .attr("fill", i => this.color(this.Z[i]))
      .attr("r", this.config.dot.radius)
      .attr("opacity", 0.5);

    this.svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 15)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .selectAll("text")
      .data(I)
      .join("text")
      .attr("x", i => this.xScale(this.X[i]))
      .attr("y", i => this.yScale(this.Y[i]))
      .text(i => this.labels[i])
      .style("fill", "white")
      .style("text-anchor", "middle")
      .style("dominant-baseline", "central");
  }
}

