import { GraphSessionCreatedEvent } from '../event/GraphSessionCreatedEvent';
import { GraphSessionUpdatedEvent } from '../event/GraphSessionUpdatedEvent';
import {
  BaseSession,
  BaseSessionEssentialProperties,
  BaseSessionOptionalProperties,
} from './base/BaseSession';

export type GraphSessionEssentialProperties = BaseSessionEssentialProperties &
  Readonly<
    Required<{
      sessionAlgorithmId: string;
    }>
  >;

export type GraphSessionOptionalProperties = BaseSessionOptionalProperties &
  Readonly<
    Partial<{
      vertexIds: number[];
      edgeIds: number[];
    }>
  >;

export type GraphSessionProperties = GraphSessionEssentialProperties &
  Required<GraphSessionOptionalProperties>;

export class GraphSession extends BaseSession {
  private readonly sessionAlgorithmId: string;
  private vertexIds: number[];
  private edgeIds: number[];

  constructor(props: GraphSessionProperties) {
    super();
    Object.assign(this, props);
  }

  updateSession(vertexIds: number[], edgeIds: number[]): void {
    this.vertexIds = vertexIds;
    this.edgeIds = edgeIds;
    this.apply(new GraphSessionUpdatedEvent(vertexIds, edgeIds));
  }

  createdGraphSession(): void {
    this.apply(new GraphSessionCreatedEvent(this.id));
  }

  getSessionAlgorithmId(): string {
    return this.sessionAlgorithmId;
  }

  getvertexIds(): number[] {
    return this.vertexIds;
  }

  getedgeIds(): number[] {
    return this.edgeIds;
  }
}
