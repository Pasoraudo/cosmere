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

export interface D3Link {
  source: string;

  target: string;

  weight: number;
}
