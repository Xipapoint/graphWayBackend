import { BaseEntity } from "./BaseEntity"

export type BaseVertexEssentialProperties = Readonly<
  Required<{
    id: string
    sessionId: string
  }>
>

export type BaseVertexOptionalProperties = Readonly<
  Partial<{
    createdAt: Date
    updatedAt: Date
  }>
>

export type BaseVertexProperties = BaseVertexEssentialProperties & Required<BaseVertexOptionalProperties>

export class BaseVertex extends BaseEntity {
    private id: number
    private readonly sessionId: string

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getSessionId(): string {
        return this.sessionId;
    }
}