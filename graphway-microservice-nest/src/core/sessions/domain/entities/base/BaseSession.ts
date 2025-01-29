import { BaseEntity } from '../../../../session-components/domain/entities/base/BaseEntity';
import { ImageBlob } from '../../../../session-components/domain/types/ImageType';

export type BaseSessionEssentialProperties = Readonly<
  Required<
    {
      id: string;
      title: string;
      sessionDataStructureId: string;
      sessionModeId: string;
      sessionStructureId: string;
      userId: string;
      analyticsId: string;
    } & ImageBlob
  >
>;

export type BaseSessionOptionalProperties = Readonly<
  Partial<{
    createdAt: Date;
    updatedAt: Date;
  }>
>;

export type SessionProperties = BaseSessionEssentialProperties &
  Required<BaseSessionOptionalProperties>;

export class BaseSession extends BaseEntity {
  protected readonly id: string;
  protected title: string;
  protected image: Buffer;
  protected readonly userId: string;
  protected readonly sessionDataStructureId: string;
  protected readonly sessionModeId: string;
  protected readonly sessionStructureId: string;
  protected analyticsId: string;

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getImagePath(): Buffer {
    return this.image;
  }

  getSessionDataStructureId(): string {
    return this.sessionDataStructureId;
  }

  getSessionStructureId(): string {
    return this.sessionStructureId;
  }

  getUserId(): string {
    return this.userId;
  }

  getSessionModeId(): string {
    return this.sessionModeId;
  }

  getAnalyticsId(): string {
    return this.analyticsId;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setImagePath(imagePath: Buffer): void {
    this.image = imagePath;
  }

  setAnalyticsId(analyticsId: string): void {
    this.analyticsId = analyticsId;
  }
}
