import {
  BaseEdge,
  BaseEdgeEssentialProperties,
  BaseEdgeOptionalProperties,
} from './base/BaseEdge';

export type EdgeWithCoordsEssentialProperties = BaseEdgeEssentialProperties & {
  _left: number;
  _top: number;
  _angle: number;
};

export type EdgeWithCoordsOptionalProperties = BaseEdgeOptionalProperties;

export type EdgeWithCoordsProperties = EdgeWithCoordsEssentialProperties &
  Required<EdgeWithCoordsOptionalProperties>;

export class EdgeWithCoords extends BaseEdge {
  private _left: number;
  private _top: number;
  private _angle: number;

  constructor(props: EdgeWithCoordsProperties) {
    super();
    Object.assign(this, props);
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
