import {
  BaseEdge,
  BaseEdgeEssentialProperties,
  BaseEdgeOptionalProperties,
} from './base/BaseEdge';

export type WeightedEdgeEssentialProperties = BaseEdgeEssentialProperties & {
  weight: number;
};

export type WeightedEdgeOptionalProperties = BaseEdgeOptionalProperties;

export type WeightedEdgeProperties = WeightedEdgeEssentialProperties &
  Required<WeightedEdgeOptionalProperties>;

export class WeightedEdge extends BaseEdge {
  private _weight: number;

  constructor(props: WeightedEdgeProperties) {
    super();
    Object.assign(this, props);
  }

  get weight(): number {
    return this._weight;
  }

  set weight(value: number) {
    this._weight = value;
  }
}
