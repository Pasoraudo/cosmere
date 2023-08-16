import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {GraphEdge, GraphNode} from '../vis/model/network';
import {BaseComponent} from '../../shared/components/base.component';
import Sigma from 'sigma';
import Graph from 'graphology';
import * as d3 from 'd3';
import {SimulationNodeDatum} from 'd3-force';
import {circular} from 'graphology-layout';
import {uniqBy, uniqWith} from 'lodash-es';
import {EdgeDisplayData, NodeDisplayData} from 'sigma/types';

interface State {
    hoveredNode?: string;
    searchQuery: string;

    // State derived from query:
    selectedNode?: string;
    suggestions?: Set<string>;

    // State derived from hovered node:
    hoveredNeighbors?: Set<string>;
}

@Component({
    selector: 'sigma-network',
    template: '<div class="w-full h-full flex" #network></div>',
    encapsulation: ViewEncapsulation.None
})

export class SigmaNetworkComponent extends BaseComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @ViewChild('network') el: ElementRef;
    @Input()
    nodes: GraphNode[];
    @Input()
    edges: GraphEdge[];
    sigma?: Sigma;
    graph: Graph;
    state: State = {searchQuery: ""};
    private color: d3.ScaleOrdinal<string, string, never>;

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.initializeColor();
    }

    ngOnChanges(): void {
        if (!this.el)
            return;

        this.renderGraph();
    }

    ngAfterViewInit(): void {
        if (!this.el)
            return;

        this.renderGraph();
    }

    ngOnDestroy(): void {
        if (this.sigma)
            this.sigma.kill();
    }

    renderGraph(): void {
        if (this.sigma)
            this.sigma.kill();

        this.filterParameters();
        this.createGraph();
        this.sigma = new Sigma(this.graph, this.el.nativeElement, {
            renderLabels: true,
            labelColor: {
                color: '#FFFFFF'
            },
        });
        this.sigma.on("enterNode", ({node}) => {
            this.setHoveredNode(node);
        });
        this.sigma.on("leaveNode", () => {
            this.setHoveredNode(undefined);
        });

        this.sigma.setSetting("nodeReducer", (node, data) => {
            const res: Partial<NodeDisplayData> = {...data};

            if (this.state.hoveredNeighbors && !this.state.hoveredNeighbors.has(node) && this.state.hoveredNode !== node) {
                res.label = "";
                res.size = 0;
                res.color = "none";
            }

            if (this.state.selectedNode === node) {
                res.highlighted = true;
            } else if (this.state.suggestions && !this.state.suggestions.has(node)) {
                res.label = "";
                res.size = 0;
                res.color = "none";
            }

            return res;
        });

        this.sigma.setSetting("edgeReducer", (edge, data) => {
            const res: Partial<EdgeDisplayData> = {...data};

            if (this.state.hoveredNode && !this.graph.hasExtremity(edge, this.state.hoveredNode)) {
                res.hidden = true;
            }

            if (this.state.suggestions && (!this.state.suggestions.has(this.graph.source(edge)) || !this.state.suggestions.has(this.graph.target(edge)))) {
                res.hidden = true;
            }

            return res;
        });
    }

    filterParameters(): void {
        this.nodes = uniqBy(this.nodes, node => node.id);
        this.edges = uniqWith(this.edges, (edge1, edge2) =>
            (edge1.source === edge2.source && edge1.target === edge2.target) ||
            (edge1.source === edge2.target && edge1.target === edge2.source)
        );
    }

    createGraph(): void {
        this.graph = new Graph();
        this.nodes.forEach(node =>
            this.graph.addNode(node.id, {label: node.label, size: node.score, color: this.color(node.group)})
        );
        this.edges.forEach(edge =>
            this.graph.addEdge(edge.source, edge.target, {size: 1, type: 'line', color: this.color(edge.group)})
        );

        this.nodes.forEach((node: any, i) => {
            const angle = (i * 2 * Math.PI) / this.graph.order;

            node.x = 100 * Math.cos(angle);
            node.y = 100 * Math.cos(angle);
        });
        circular.assign(this.graph)

        const _this = this;
        const nodes: SimulationNodeDatum[] = this.nodes as SimulationNodeDatum[];
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(this.edges).id(this.getId)) // @ts-ignore
            .force("charge", d3.forceManyBody().strength(d => d.score * (-100))) // @ts-ignore
            .force("center", d3.forceCenter(0, 0))// @ts-ignore
            .force("radius", d3.forceCollide(d => d.score * 100))
            .force('cluster', this.cluster())
            .on("tick", () => {
                _this.graph.nodes().forEach((graphNode, i) => {
                    const node: GraphNode = _this.nodes[i];
                    _this.graph.setNodeAttribute(graphNode, "x", node.x);
                    _this.graph.setNodeAttribute(graphNode, "y", node.y);
                    if (node.id === 'Vin')
                        console.log(node.x, node.y)
                });
            })
            .on("end", () => simulation.restart())
    }

    initializeColor(): void {
        const groups = Array.from(new Set(this.edges.map(graphEdge => graphEdge.group)));
        this.color = d3.scaleOrdinal(groups, d3.schemeCategory10);
    }

    cluster() {
        const strength = 0.7;
        const _this = this;

        function force(alpha) {
            _this.graph.nodes().forEach((graphNode, i) => {
                const node: GraphNode = _this.nodes[i];
                const clusterNodes = _this.nodes.filter(d => d.group === node.group);

                const x = clusterNodes.reduce((acc, curr) => acc + curr.x, 0) / clusterNodes.length;
                const y = clusterNodes.reduce((acc, curr) => acc + curr.y, 0) / clusterNodes.length;
                // @ts-ignore
                node.vx += (x - node.x) * alpha * strength;
                // @ts-ignore
                node.vy += (y - node.y) * alpha * strength;
            });
        }

        return force;
    }

    getId(d) {
        return d.id;
    }

    setHoveredNode(node?: string) {
        if (node) {
            this.state.hoveredNode = node;
            this.state.hoveredNeighbors = new Set(this.graph.neighbors(node));
        } else {
            this.state.hoveredNode = undefined;
            this.state.hoveredNeighbors = undefined;
        }

        this.sigma.refresh();
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}
