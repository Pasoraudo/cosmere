import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';
import * as d3 from 'd3';
import {color, drag} from 'd3';

@Component({
  selector: 'd3-network',
  template: '<div class="flex flex-1" id="network"></div>',
})
export class D3NetworkComponent extends BaseComponent implements AfterViewInit, OnChanges {
  @Input()
  nodes: any[] = [
    {
      "id": 1,
      "name": "A"
    },
    {
      "id": 2,
      "name": "B"
    },
    {
      "id": 3,
      "name": "C"
    },
    {
      "id": 4,
      "name": "D"
    },
    {
      "id": 5,
      "name": "E"
    },
    {
      "id": 6,
      "name": "F"
    },
    {
      "id": 7,
      "name": "G"
    },
    {
      "id": 8,
      "name": "H"
    },
    {
      "id": 9,
      "name": "I"
    },
    {
      "id": 10,
      "name": "J"
    }
  ]
  @Input()
  links: any[] = [

    {
      "source": 1,
      "target": 2
    },
    {
      "source": 1,
      "target": 5
    },
    {
      "source": 1,
      "target": 6
    },

    {
      "source": 2,
      "target": 3
    },
    {
      "source": 2,
      "target": 7
    }
    ,

    {
      "source": 3,
      "target": 4
    },
    {
      "source": 8,
      "target": 3
    }
    ,
    {
      "source": 4,
      "target": 5
    }
    ,

    {
      "source": 4,
      "target": 9
    },
    {
      "source": 5,
      "target": 10
    }
  ];
  private width: number = 1000;
  private height: number = 800;
  private simulation;
  private link;
  private svg;
  private node;
  private margin = {top: 100, right: 30, bottom: 30, left: 40}

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.create();
  }

  ngAfterViewInit(): void {
    this.create();
  }

  create(): void {
    this.createSimulation();
    this.createSvg();
    this.createLink();
    this.createNode();
  }

  createSimulation(): void {
    this.simulation = d3.forceSimulation(this.nodes)
      .force("link", d3.forceLink()
        .id(function(d) { // @ts-ignore
          return d.id; })
        .links(this.links)
      )
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
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  createLink(): void {
    this.link = this.svg
      .selectAll("line")
      .data(this.links)
      .enter()
      .append("line")
      .style("stroke", "#aaa")
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
}

