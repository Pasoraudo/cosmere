export interface GraphNode {
  id: string;

  label: string;

  group: string;
}

export interface GraphEdge {
  from: string;

  to: string;

  value: number;
}

export const D3NodeMinScore: number = 5;
export const D3NodeMaxScore: number = 60;

export interface D3Node {
  id: string;
  label: string;
  group: string;
  score: number;
}

export interface D3Link {
  source: string;
  target: string;
  weight: number;
  group: string;
}

export interface D3Options {
  zoom?: boolean;
  edgeRadius?: number;
  directed?: boolean;
  drag?: boolean;
  colors?: Record<string, string>;
  curveEdges?: boolean;
}
