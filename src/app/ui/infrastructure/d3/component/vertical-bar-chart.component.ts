import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';
import * as d3 from 'd3';
import {BarChartItem} from '../model/barChar.model';
import {uuid} from '../../../../../domain/function/uuid.helper';

@Component({
  selector: 'vertical-bar-chart',
  template: '<div class="flex flex-1" id="{{id}}-vertical-bar-chart"></div>',
})
export class VerticalBarChartComponent extends BaseComponent implements AfterViewInit, OnChanges {
  @Input()
  data: BarChartItem[];
  @Input()
  private config: { [name: string]: any } = {
    colors: {
      highlight: '#b11adc',
      highlightLight: '#d975f6',
      text: '#777',
      xAxis: '#eee',
      yAxis: '#999'
    },
    height: 500,
    width: 640,
    margin: {
      top: 30,
      left: 70,
      right: 5,
      bottom: 0
    },
    gap: 0.4,
    xFormat: '',
    animationDuration: 300,
    ticksInterval: 10,
    type: d3.scaleLinear,
    titleColor: "white",
    title: ''
  };

  protected id: string = uuid();
  private element: HTMLElement;
  private svg: any;
  private xDomain: any;
  private yDomain: any;
  private yScale: any;
  private xScale: any;
  private xAxis: any;
  private yAxis: any;
  private X: number[];
  private Y: string[];

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

    this.data = this.data.splice(0, 10);
    this.element = document.getElementById(this.id + '-vertical-bar-chart');

    this.initValues();
    this.initScales();
    this.createSvg();
  }

  private initValues() {
    this.X = this.data.map(e => e.value);
    this.Y = this.data.map(e => e.label);
  }

  initScales(): void {
    const xRange = [this.config.margin.left, this.config.width - this.config.margin.right];
    const yRange = [this.config.margin.top, this.config.height - this.config.margin.bottom];
    this.xDomain = [0, d3.max(this.X)];
    this.yDomain = new d3.InternSet(this.Y);
    this.xScale = this.config.type(this.xDomain, xRange);
    this.yScale = d3.scaleBand(this.yDomain, yRange).padding(this.config.gap);
    this.xAxis = d3.axisTop(this.xScale).ticks(this.config.width / 80, this.config.xFormat);
    this.yAxis = d3.axisLeft(this.yScale).tickSizeOuter(0);

  }

  createSvg(): void {
    const I = d3.range(this.X.length).filter(i => this.yDomain.has(this.Y[i]));

    d3.select(this.element).select('svg').remove()
    this.svg = this.svg = d3.select(this.element)
      .append("svg")
      .attr("width", this.config.width)
      .attr("height", this.config.height)
      .attr("viewBox", [0, 0, this.config.width, this.config.height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    this.svg.append("g")
      .attr("transform", `translate(0,${this.config.margin.top})`)
      .call(this.xAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("y2", this.config.height - this.config.margin.top - this.config.margin.bottom)
        .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
        .attr("x", this.config.width - this.config.margin.right)
        .attr("y", -22)
        .attr("fill", "none")
        .attr("text-anchor", "end"));

    this.svg.append("g")
      .attr("fill", "red")
      .selectAll("rect")
      .data(I)
      .join("rect")
      .attr("x", this.xScale(0))
      .attr("y", i => this.yScale(this.Y[i]))
      .attr("width", i => this.xScale(this.X[i]) - this.xScale(0))
      .attr("height", this.yScale.bandwidth());

    this.svg.append("g")
      .attr("fill", this.config.titleColor)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("text")
      .data(I)
      .join("text")
      .attr("x", i => this.xScale(this.X[i]))
      .attr("y", i => this.yScale(this.Y[i]) + this.yScale.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text(this.config.title)
      .call(text => text.filter(i => this.xScale(this.X[i]) - this.xScale(0) < 20) // short bars
        .attr("dx", +4)
        .attr("fill", this.config.titleAltColor)
        .attr("text-anchor", "start"));

    this.svg.append("g")
      .attr("transform", `translate(${this.config.margin.left},0)`)
      .call(this.yAxis);
  }
}

