export interface GraphNode {
  id: string;
  label: string;
  group: string;
  score: number;
  x?: number;
  y?: number;
  vx?: number
  vy?: number
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
  group?: string;
}

export const D3NodeMinScore: number = 2;
export const D3NodeMaxScore: number = 30;

export interface GraphOptions {
  zoom?: boolean;
  directed?: boolean;
  drag?: boolean;
  nodeColors?: Record<string, string>;
  edgeColors?: Record<string, string>;
  curveEdges?: boolean;
  hover?: boolean;
  clusterRepulsion?: boolean;
  edgeWidth?: number;
}
