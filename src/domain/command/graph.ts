import {GraphEdge, GraphNode} from '../model/network';

export interface UpdateGraph {
  nodes: GraphNode[];

  edges: GraphEdge[];

  options?: any;
}
