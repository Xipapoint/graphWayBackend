import { ImageBlob, ImageBlobType } from '../../types/ImageType';
import { BaseEntity } from './BaseEntity';

export type BaseSessionComponentEssentialProperties = Readonly<
  Required<
    {
      id: string;
      title: string;
      description: string;
    } & ImageBlob
  >
>;

export type BaseSessionComponentOptionalProperties = Readonly<
  Partial<{
    createdAt: Date;
    updatedAt: Date;
  }>
>;

export type BaseSessionComponentProperties =
  BaseSessionComponentEssentialProperties &
    Required<BaseSessionComponentOptionalProperties>;

export class BaseSessionComponent extends BaseEntity {
  protected readonly id: number;
  protected readonly title: string;
  protected description: string;
  protected image: ImageBlobType;

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }
  getImagePath(): ImageBlobType {
    return this.image;
  }

  setDescription(newDescription: string): void {
    this.description = newDescription;
    this.updatedAt = new Date();
  }

  setImagePath(newImagePath: ImageBlobType): void {
    this.image = newImagePath;
    this.updatedAt = new Date();
  }
}
