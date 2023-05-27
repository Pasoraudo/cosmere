import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';
import * as d3 from 'd3';
import {BarChartItem} from '../model/barChar.model';

@Component({
  selector: 'vertical-bar-chart',
  template: '<div class="flex flex-1" id="{{id}}-vertical-bar-chart"></div>',
})
export class VerticalBarChartComponent extends BaseComponent implements AfterViewInit, OnChanges {
  @Input()
  data: BarChartItem[];
  @Input()
  id: string;
  @Input()
  private config: { [name: string]: any } = {
    colors: {
      highlight: '#b11adc',
      highlightLight: '#d975f6',
      text: '#777',
      xAxis: '#eee',
      yAxis: '#999'
    },
    height: 200,
    width: 600,
    margin: {
      top: 10,
      left: 40,
      right: 10,
      bottom: 20
    },
    animationDuration: 300,
    ticksInterval: 10,
    type: d3.scaleLinear
  };

  private element: HTMLElement;
  private minValue: number;
  private maxValue: number;
  private svg: any;
  private yScale: any;
  private xScale: any;

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

    this.initValues()
    this.initScales()
    this.initChart()
    this.createAxis()
    this.createBars()
  }

  private initChart() {
    d3.select(this.element).select('svg').remove()
    this.svg = d3.select(this.element)
      .append("svg")
      .attr(
        'viewBox',
        `0 0 ${this.config.width} ${this.config.height + 100}`
      )
  }

  private initValues() {
    const minValue = Number(d3.min(this.data.map(el => el.value)));
    const maxValue = Number(d3.max(this.data.map(el => el.value)));

    this.minValue = minValue < 0 ? minValue - this.config.ticksInterval : 0;
    this.maxValue = maxValue;
  }

  initScales(): void {
    const xDomain = d3.extent(this.data.map(e => e.value))
    this.xScale = this.config.type(xDomain, xRange);
    this.yScale = d3.scaleBand(yDomain, yRange).padding(yPadding);
  }
  function BarChart(data, {
    x = d => d,
    y = (d, i) => i,
    title,
    marginTop = 30,
    marginRight = 0,
    marginBottom = 10,
    marginLeft = 30,
    width = 640,
    height,
    xType = d3.scaleLinear,
    xDomain,
    xRange = [marginLeft, width - marginRight],
    xFormat,
    xLabel,
    yPadding = 0.1,
    yDomain,
    yRange,
    color = "currentColor",
    titleColor = "white",
    titleAltColor = "currentColor",
  } = {}) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);

    // Compute default domains, and unique the y-domain.
    if (xDomain === undefined) xDomain = [0, d3.max(X)];
    if (yDomain === undefined) yDomain = Y;
    yDomain = new d3.InternSet(yDomain);

    // Omit any data not present in the y-domain.
    const I = d3.range(X.length).filter(i => yDomain.has(Y[i]));

    // Compute the default height.
    if (height === undefined) height = Math.ceil((yDomain.size + yPadding) * 25) + marginTop + marginBottom;
    if (yRange === undefined) yRange = [marginTop, height - marginBottom];

    // Construct  and axes.

    const xAxis = d3.axisTop(xScale).ticks(width / 80, xFormat);
    const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

    // Compute titles.
    if (title === undefined) {
      const formatValue = xScale.tickFormat(100, xFormat);
      title = i => `${formatValue(X[i])}`;
    } else {
      const O = d3.map(data, d => d);
      const T = title;
      title = i => T(O[i], i, data);
    }

    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("y2", height - marginTop - marginBottom)
        .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
        .attr("x", width - marginRight)
        .attr("y", -22)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text(xLabel));

    svg.append("g")
      .attr("fill", color)
      .selectAll("rect")
      .data(I)
      .join("rect")
      .attr("x", xScale(0))
      .attr("y", i => yScale(Y[i]))
      .attr("width", i => xScale(X[i]) - xScale(0))
      .attr("height", yScale.bandwidth());

    svg.append("g")
      .attr("fill", titleColor)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("text")
      .data(I)
      .join("text")
      .attr("x", i => xScale(X[i]))
      .attr("y", i => yScale(Y[i]) + yScale.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text(title)
      .call(text => text.filter(i => xScale(X[i]) - xScale(0) < 20) // short bars
        .attr("dx", +4)
        .attr("fill", titleAltColor)
        .attr("text-anchor", "start"));

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis);

    return svg.node();
  }
}

