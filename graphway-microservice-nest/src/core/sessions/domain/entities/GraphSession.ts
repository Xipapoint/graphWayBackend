import {
  BaseSession,
  BaseSessionEssentialProperties,
  BaseSessionOptionalProperties,
} from './base/BaseSession';

export type GraphSessionEssentialProperties = BaseSessionEssentialProperties &
  Readonly<
    Required<{
      sessionAlgorithmId: number;
      sessionStructureId: number;
    }>
  >;

export type GraphSessionOptionalProperties = BaseSessionOptionalProperties &
  Readonly<
    Partial<{
      verticesId: number[];
      edgesId: number[];
    }>
  >;

export type GraphSessionProperties = GraphSessionEssentialProperties &
  Required<GraphSessionOptionalProperties>;

export class GraphSession extends BaseSession {
  private readonly sessionAlgorithmId: number;
  private readonly sessionStructureId: number;
  private verticesId: number[];
  private edgesId: number[];

  constructor(props: GraphSessionProperties) {
    super();
    Object.assign(this, props);
  }

  update(verticesId: number[], edgesId: number[]): void {
    this.verticesId = verticesId;
    this.edgesId = edgesId;
  }

  getSessionAlgorithmId(): number {
    return this.sessionAlgorithmId;
  }

  getSessionStructureId(): number {
    return this.sessionStructureId;
  }

  getVerticesId(): number[] {
    return this.verticesId;
  }

  getEdgesId(): number[] {
    return this.edgesId;
  }
}
