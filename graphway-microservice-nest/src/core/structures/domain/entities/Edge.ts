import {
  BaseEdge,
  BaseEdgeEssentialProperties,
  BaseEdgeOptionalProperties,
} from './base/BaseEdge';

export type EdgeEssentialProperties = BaseEdgeEssentialProperties;

export type EdgeOptionalProperties = BaseEdgeOptionalProperties;

export type EdgeProperties = EdgeEssentialProperties &
  Required<EdgeOptionalProperties>;

export class Edge extends BaseEdge {
  constructor(props: EdgeProperties) {
    super();
    Object.assign(this, props);
  }
}
