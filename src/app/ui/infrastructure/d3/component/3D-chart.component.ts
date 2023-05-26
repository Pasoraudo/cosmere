import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';
import * as d3 from 'd3';

@Component({
  selector: '3d-chart',
  template: '<div class="flex flex-1" id="{{id}}-barchart"></div>',
})
export class Chart3DComponent extends BaseComponent implements AfterViewInit, OnChanges {
  @Input()
  data: any[];
  @Input()
  id: string;
  @Input()
  private options: { [name: string]: any } = {
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
    ticksInterval: 10
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
    this.element = document.getElementById(this.id + '-barchart');

    this.initValues()
    this.initScales()
    this.initChart()
    this.createAxis()
    this.createBars()
    this.createCell();
  }

  private initChart() {
    const el = d3.select(this.element)
    el.select('svg').remove()

    this.svg = d3.select('#' + this.id + '-3Dchart')
      .append("svg")
      .attr(
        'viewBox',
        `0 0 ${this.options.width} ${this.options.height + 100}`
      )
  }

  private initValues() {
    const minValue = Number(d3.min(this.data.map(el => el.value)));
    const maxValue = Number(d3.max(this.data.map(el => el.value)));

    this.minValue = minValue < 0 ? minValue - this.options.ticksInterval : 0;
    this.maxValue = maxValue;
  }

  private initScales() {
    const xScales = X.map(X => xType(d3.extent(X), [0, cellWidth]));
    const yScales = Y.map(Y => yType(d3.extent(Y), [cellHeight, 0]));
    const zScale = d3.scaleOrdinal(zDomain, colors);
  }

  private getBarMaxWidth() {
    const width = window.innerWidth
    return width <= 768 ? width <= 480 ? 10 : 15 : 20
  }

  private getBarColor(i: number, change: number = 0) {
    const red = (210 + change).toString()
    const green = ((10 + 20 * i) + change).toString()
    const blue = ((220 - 20 * i) + change).toString()
    return `rgb(${red}, ${green}, ${blue})`
  }

  private createBars() {
    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-marginLeft, -marginTop, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
      .selectAll("g")
      .data(yScales)
      .join("g")
      .attr("transform", (d, i) => `translate(0,${i * (cellHeight + padding)})`)
      .each(function(yScale) { return d3.select(this).call(yAxis.scale(yScale)); })
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1));

    svg.append("g")
      .selectAll("g")
      .data(xScales)
      .join("g")
      .attr("transform", (d, i) => `translate(${i * (cellWidth + padding)},${height - marginBottom - marginTop})`)
      .each(function(xScale) { return d3.select(this).call(xAxis.scale(xScale)); })
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("y2", -height + marginTop + marginBottom)
        .attr("stroke-opacity", 0.1))
  }

  private createAxis() {
    const xAxis = d3.axisBottom().ticks(cellWidth / 50);
    const yAxis = d3.axisLeft().ticks(cellHeight / 35);

    const xAxis = d3
      .axisBottom(this.xScale)
      .tickSize(-this.options.width)
      .tickFormat((d, i) => this.data[i].label.toUpperCase())

    const yAxis = d3
      .axisLeft(this.yScale)
      .tickSize(-this.options.width)
      .tickFormat(d => `${d}`)
      .ticks(this.options.ticksInterval)
  }

  private createSvg(): void {
    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-marginLeft, -marginTop, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
      .selectAll("g")
      .data(yScales)
      .join("g")
      .attr("transform", (d, i) => `translate(0,${i * (cellHeight + padding)})`)
      .each(function(yScale) { return d3.select(this).call(yAxis.scale(yScale)); })
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1));

    svg.append("g")
      .selectAll("g")
      .data(xScales)
      .join("g")
      .attr("transform", (d, i) => `translate(${i * (cellWidth + padding)},${height - marginBottom - marginTop})`)
      .each(function(xScale) { return d3.select(this).call(xAxis.scale(xScale)); })
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("y2", -height + marginTop + marginBottom)
        .attr("stroke-opacity", 0.1))
  }
  private createCell(): void {
    const cell = svg.append("g")
      .selectAll("g")
      .data(d3.cross(d3.range(X.length), d3.range(Y.length)))
      .join("g")
      .attr("fill-opacity", fillOpacity)
      .attr("transform", ([i, j]) => `translate(${i * (cellWidth + padding)},${j * (cellHeight + padding)})`);

    cell.append("rect")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("width", cellWidth)
      .attr("height", cellHeight);

    cell.each(function([x, y]) {
      d3.select(this).selectAll("circle")
        .data(I.filter(i => !isNaN(X[x][i]) && !isNaN(Y[y][i])))
        .join("circle")
        .attr("r", 3.5)
        .attr("cx", i => xScales[x](X[x][i]))
        .attr("cy", i => yScales[y](Y[y][i]))
        .attr("fill", i => zScale(Z[i]));
    });
  }
  private calculatePadding(barCount: number) {
    return 1 - (barCount * this.getBarMaxWidth() / this.options.width)
  }
}

