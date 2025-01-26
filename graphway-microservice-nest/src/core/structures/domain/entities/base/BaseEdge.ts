import { BaseEntity } from './BaseEntity';

export type BaseEdgeEssentialProperties = Readonly<
  Required<{
    id: string;
    startVertex: number;
    endVertex: number;
    sessionId: string;
  }>
>;

export type BaseEdgeOptionalProperties = Readonly<
  Partial<{
    createdAt: Date;
    updatedAt: Date;
  }>
>;

export type BaseEdgeProperties = BaseEdgeEssentialProperties &
  Required<BaseEdgeOptionalProperties>;

export class BaseEdge extends BaseEntity {
  private id: number;
  private startVertex: number;
  private endVertex: number;
  private sessionId: string;

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getStartVertex(): number {
    return this.startVertex;
  }

  public setStartVertex(startVertex: number): void {
    this.startVertex = startVertex;
  }

  public getEndVertex(): number {
    return this.endVertex;
  }

  public setEndVertex(endVertex: number): void {
    this.endVertex = endVertex;
  }

  public getSessionId(): string {
    return this.sessionId;
  }
}
