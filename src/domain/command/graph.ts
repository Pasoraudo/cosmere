import {GraphEdge, GraphNode} from '../../app/ui/infrastructure/vis/model/network';

export interface UpdateGraph {
  nodes: GraphNode[];

  edges: GraphEdge[];

  options?: any;
}
