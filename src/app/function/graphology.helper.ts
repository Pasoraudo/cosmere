import {eccentricity} from 'graphology-metrics/node';
import Graph from 'graphology';

export const getNodeClusteringCoefficient = (graph: Graph, node: string): number => {
  const neighbors = graph.neighbors(node);
  const degree = neighbors.length;

  if (degree < 2) {
    return 0;
  }

  let edgeCount = 0;

  for (let i = 0; i < degree; i++) {
    const neighbor1 = neighbors[i];

    for (let j = i + 1; j < degree; j++) {
      const neighbor2 = neighbors[j];

      if (graph.hasEdge(neighbor1, neighbor2)) {
        edgeCount++;
      }
    }
  }

  return (2 * edgeCount) / (degree * (degree - 1));
}

export const calculateClusteringCoefficient = (graph: Graph): number => {
  let totalCoefficient = 0;

  graph.forEachNode((node) => {
    const clusteringCoefficient = getNodeClusteringCoefficient(graph, node);
    totalCoefficient += clusteringCoefficient;
  });

  return totalCoefficient / graph.order;
}

export const calculateEccentricityCoefficient = (graph: Graph): number => {
  let totalCoefficient = 0;

  graph.forEachNode((node) => {
    const clusteringCoefficient = eccentricity(graph, node);
    totalCoefficient += clusteringCoefficient;
  });

  return totalCoefficient / graph.order;
}
