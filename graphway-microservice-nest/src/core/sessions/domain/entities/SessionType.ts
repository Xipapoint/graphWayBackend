import { CreatedSessionComponent } from '../event/CreatedSessionComponent';
import {
  BaseSessionComponent,
  BaseSessionComponentEssentialProperties,
  BaseSessionComponentOptionalProperties,
} from './base/BaseSessionComponent';

export type SessionTypeEssentialProperties =
  BaseSessionComponentEssentialProperties;

export type SessionTypeOptionalProperties =
  BaseSessionComponentOptionalProperties;

export type SessionTypeProperties = SessionTypeEssentialProperties &
  Required<SessionTypeOptionalProperties>;

export class SessionType extends BaseSessionComponent {
  constructor(props: SessionTypeProperties) {
    super();
    Object.assign(this, props);
  }

  create() {
    this.apply(new CreatedSessionComponent(this.id, this.title));
  }
}
