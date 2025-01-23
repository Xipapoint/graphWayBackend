import {
  BaseEdge,
  BaseEdgeEssentialProperties,
  BaseEdgeOptionalProperties,
} from './base/BaseEdge';

export type WeightedEdgeWithCoordsEssentialProperties =
  BaseEdgeEssentialProperties & {
    weight: number;
    _left: number;
    _top: number;
    _angle: number;
  };

export type WeightedEdgeWithCoordsOptionalProperties =
  BaseEdgeOptionalProperties;

export type WeightedEdgeWithCoordsProperties =
  WeightedEdgeWithCoordsEssentialProperties &
    Required<WeightedEdgeWithCoordsOptionalProperties>;

export class WeightedEdgeWithCoords extends BaseEdge {
  private _weight: number;
  private _left: number;
  private _top: number;
  private _angle: number;

  constructor(props: WeightedEdgeWithCoordsProperties) {
    super();
    Object.assign(this, props);
  }

  get weight(): number {
    return this._weight;
  }

  set weight(value: number) {
    this._weight = value;
  }
  get left(): number {
    return this._left;
  }

  set left(value: number) {
    this._left = value;
  }

  get top(): number {
    return this._top;
  }

  set top(value: number) {
    this._top = value;
  }

  get angle(): number {
    return this._angle;
  }

  set angle(value: number) {
    this._angle = value;
  }
}
