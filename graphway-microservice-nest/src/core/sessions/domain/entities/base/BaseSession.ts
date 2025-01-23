import { BaseEntity } from "./BaseEntity";
import { ImageBlob } from "../../types/ImageType";

export type BaseSessionEssentialProperties = Readonly<
  Required<{
    id: string
    title: string
    sessionTypeId: number
    sessionModeId: number
    userId: string
  } & ImageBlob>
>

export type BaseSessionOptionalProperties = Readonly<
  Partial<{
    createdAt: Date
    updatedAt: Date
  }>
>

export type SessionProperties = BaseSessionEssentialProperties & Required<BaseSessionOptionalProperties>

export class BaseSession extends BaseEntity {
    private readonly id: string;
    private title: string;
    private imagePath: string;
    private readonly sessionTypeId: number;

    getId(): string {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getImagePath(): string {
        return this.imagePath;
    }

    getSessionTypeId(): number {
        return this.sessionTypeId;
    }


    setTitle(title: string): void {
        this.title = title;
    }

    setImagePath(imagePath: string): void {
        this.imagePath = imagePath;
    }

}
