import { CreatedSessionComponent } from '../event/CreatedSessionComponent';
import {
  BaseSessionComponent,
  BaseSessionComponentEssentialProperties,
  BaseSessionComponentOptionalProperties,
} from './base/BaseSessionComponent';

export type SessionModeEssentialProperties =
  BaseSessionComponentEssentialProperties;
export type SessionModeOptionalProperties =
  BaseSessionComponentOptionalProperties;
export type SessionModeProperties = SessionModeEssentialProperties &
  Required<SessionModeOptionalProperties>;

export class SessionMode extends BaseSessionComponent {
  constructor(props: SessionModeProperties) {
    super();
    Object.assign(this, props);
  }

  create() {
    this.apply(new CreatedSessionComponent(this.id, this.title));
  }
}
