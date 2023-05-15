import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';
import * as d3 from 'd3';

@Component({
  selector: 'bar-chart',
  template: '<div class="flex flex-1" id="{{id}}-barchart"></div>',
})
export class BarChartComponent extends BaseComponent implements AfterViewInit, OnChanges {
  @Input()
  data: any[];
  @Input()
  id: string;
  @Input()
  private options: {[name: string]: any} = {
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
      left: 30,
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
  }

  private initChart() {
    const el = d3.select(this.element)
    el.select('svg').remove()

    this.svg = d3.select('#' + this.id + '-barchart')
      .append("svg")
      .attr(
        'viewBox',
        `0 0 ${this.options.width} ${this.options.height + 50}`
      )
  }

  private initValues() {
    const minValue = Number(d3.min(this.data.map(el => el.value)))
    const maxValue = Number(d3.max(this.data.map(el => el.value)))

    this.minValue = minValue < 0 ? minValue - this.options.ticksInterval : 0
    this.maxValue = maxValue + this.options.ticksInterval
  }

  private initScales() {
    this.yScale = d3
      .scaleLinear()
      .domain([this.minValue, this.maxValue])
      .range([
        this.options.height - this.options.margin.bottom,
        this.options.margin.top
      ])

    this.xScale = d3
      .scaleBand<number>()
      .domain(d3.range(this.data.length))
      .range([
        this.options.margin.left + this.options.margin.right,
        this.options.width - this.options.margin.right
      ])
      .paddingInner(this.calculatePadding(this.data.length))
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
    const bars = this.svg
      .selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .classed('bar', true)
      .style('fill', 'transparent')
      .style('display', (d) => typeof d.value === 'number' ? 'initial' : 'none')
      .attr('x', (d, i) => this.xScale(i))
      .attr('y', this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)

    bars
      .transition()
      .style('fill', (d, i) => this.getBarColor(i))
      .duration(this.options.animationDuration)
      .delay((d, i) => i * this.options.animationDuration / 3)
      .attr('x', (d, i) => this.xScale(i))
      .attr('y', (d, i) => d.value < 0 ? this.yScale(0) : this.yScale(d.value))
      .attr('width', this.xScale.bandwidth())
      .attr('height', (d, i) => d.value < 0 ? this.yScale(d.value) - this.yScale(0) : this.yScale(0) - this.yScale(d.value))

    bars.on("mouseover touchstart", (d, i, nodes) => {
      const tick = d3.select(`.x-axis .tick:nth-child(${i+1}`)
      const color = this.getBarColor(i, 20)

      d3.select(nodes[i])
        .transition()
        .style('fill', color)

      tick.select('line')
        .transition()
        .style('stroke', color)

      tick.select('text')
        .transition()
        .style('fill', color)

    }).on("mouseout touchend", (d, i, nodes) => {
      const tick = d3.select(`.x-axis .tick:nth-child(${i+1}`)

      d3.select(nodes[i])
        .transition()
        .style('fill', this.getBarColor(i))

      tick.select('line')
        .transition()
        .style('stroke', this.options.colors.xAxis)

      tick.select('text')
        .transition()
        .style('fill', this.options.colors.text)
    })
  }

  private createAxis() {
    const xAxis = d3
      .axisBottom(this.xScale)
      .tickSize(-this.options.width)
      .tickFormat((d, i) => this.data[i].label.toUpperCase())

    const yAxis = d3
      .axisLeft(this.yScale)
      .tickSize(-this.options.width)
      .tickFormat(d => `${d} %`)
      .ticks(this.options.ticksInterval)

    this.svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', `translate(0, ${this.options.height-15})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");


    this.svg
      .append('g')
      .attr('class', 'axis y-axis')
      .attr('transform', `translate(${+this.options.margin.left}, 0)`)
      .call(yAxis)

    this.svg.selectAll('.axis .domain').remove()
    this.svg.selectAll('.axis .tick text').style('fill', this.options.colors.text)
    this.svg.selectAll('.y-axis .tick line').style('stroke', this.options.colors.yAxis)
    this.svg.selectAll('.x-axis .tick line').style('stroke', this.options.colors.xAxis)
  }

  private calculatePadding(barCount: number) {
    return 1 - (barCount * this.getBarMaxWidth() / this.options.width)
  }
}

