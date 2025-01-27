import { CreatedSessionComponent } from '../event/CreatedSessionComponent';
import {
  BaseSessionComponent,
  BaseSessionComponentEssentialProperties,
  BaseSessionComponentOptionalProperties,
} from './base/BaseSessionComponent';

export type SessionStructureEssentialProperties =
  BaseSessionComponentEssentialProperties;

export type SessionStructureOptionalProperties =
  BaseSessionComponentOptionalProperties;
export type SessionStructureProperties = SessionStructureEssentialProperties &
  Required<SessionStructureOptionalProperties>;

export class SessionStructure extends BaseSessionComponent {
  constructor(props: SessionStructureProperties) {
    super();
    Object.assign(this, props);
  }

  create() {
    this.apply(new CreatedSessionComponent(this.id, this.title));
  }
}
