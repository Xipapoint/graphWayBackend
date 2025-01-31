import { CreatedSessionComponent } from '../event/CreatedSessionComponent';
import {
  BaseSessionComponent,
  BaseSessionComponentEssentialProperties,
  BaseSessionComponentOptionalProperties,
} from './base/BaseSessionComponent';

export type SessionStructureEssentialProperties =
  BaseSessionComponentEssentialProperties &
    Readonly<
      Required<{
        sessionDataStructureIds: string[];
      }>
    >;

export type SessionStructureOptionalProperties =
  BaseSessionComponentOptionalProperties;
export type SessionStructureProperties = SessionStructureEssentialProperties &
  Required<SessionStructureOptionalProperties>;

export class SessionStructure extends BaseSessionComponent {
  protected sessionDataStructureIds: string[];

  constructor(props: SessionStructureProperties) {
    super();
    Object.assign(this, props);
  }

  getSessionDataStructureIds(): string[] {
    return this.sessionDataStructureIds;
  }

  setSessionDataStructureIds(ids: string[]): void {
    this.sessionDataStructureIds = ids;
  }

  create() {
    this.apply(new CreatedSessionComponent(this.id, this.title));
  }
}
