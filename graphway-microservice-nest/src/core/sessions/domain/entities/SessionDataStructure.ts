import { CreatedSessionComponent } from '../event/CreatedSessionComponent';
import {
  BaseSessionComponent,
  BaseSessionComponentEssentialProperties,
  BaseSessionComponentOptionalProperties,
} from './base/BaseSessionComponent';

export type SessionDataStructureEssentialProperties =
  BaseSessionComponentEssentialProperties;

export type SessionDataStructureOptionalProperties =
  BaseSessionComponentOptionalProperties;

export type SessionDataStructureProperties =
  SessionDataStructureEssentialProperties &
    Required<SessionDataStructureOptionalProperties>;

export class SessionDataStructure extends BaseSessionComponent {
  constructor(props: SessionDataStructureProperties) {
    super();
    Object.assign(this, props);
  }

  create() {
    this.apply(new CreatedSessionComponent(this.id, this.title));
  }
}
