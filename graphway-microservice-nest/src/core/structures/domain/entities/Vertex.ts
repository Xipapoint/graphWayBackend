import {
  BaseVertex,
  BaseVertexEssentialProperties,
  BaseVertexOptionalProperties,
} from './base/BaseVertex';

export type VertexEssentialProperties = BaseVertexEssentialProperties;

export type VertexOptionalProperties = BaseVertexOptionalProperties;

export type VertexProperties = BaseVertexEssentialProperties &
  Required<BaseVertexOptionalProperties>;

export class Vertex extends BaseVertex {
  constructor(props: VertexProperties) {
    super();
    Object.assign(this, props);
  }
}
