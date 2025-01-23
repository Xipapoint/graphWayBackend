import {
  BaseVertex,
  BaseVertexEssentialProperties,
  BaseVertexOptionalProperties,
} from './base/BaseVertex';

export type VertexWithCoordsEssentialProperties =
  BaseVertexEssentialProperties & {
    xCord: number;
    yCord: number;
  };

export type VertexWithCoordsOptionalProperties = BaseVertexOptionalProperties;

export type VertexWithCoordsProperties = BaseVertexEssentialProperties &
  Required<BaseVertexOptionalProperties>;

export class VertexWithCoords extends BaseVertex {
  private xCord: number;

  private yCord: number;

  constructor(props: VertexWithCoordsProperties) {
    super();
    Object.assign(this, props);
  }

  public getXCord(): number {
    return this.xCord;
  }

  public setXCord(xCord: number): void {
    this.xCord = xCord;
  }

  public getYCord(): number {
    return this.yCord;
  }

  public setYCord(yCord: number): void {
    this.yCord = yCord;
  }
}
