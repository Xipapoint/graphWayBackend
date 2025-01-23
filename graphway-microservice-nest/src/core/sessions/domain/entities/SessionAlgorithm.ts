import { CreatedSessionComponent } from '../event/CreatedSessionComponent';
import {
  BaseSessionComponent,
  BaseSessionComponentEssentialProperties,
  BaseSessionComponentOptionalProperties,
} from './base/BaseSessionComponent';

export type SessionAlgorithmEssentialProperties =
  BaseSessionComponentEssentialProperties &
    Readonly<
      Required<{
        sessionStructureId: number;
      }>
    >;

export type SessionAlgorithmOptionalProperties =
  BaseSessionComponentOptionalProperties;

export type SessionAlgorithmProperties = SessionAlgorithmEssentialProperties &
  Required<SessionAlgorithmOptionalProperties>;

export class SessionAlgorithm extends BaseSessionComponent {
  private sessionStructureId: number;

  constructor(props: SessionAlgorithmProperties) {
    super();
    Object.assign(this, props);
  }

  create() {
    this.apply(new CreatedSessionComponent(this.id, this.title));
  }

  getSessionStructureId(): number {
    return this.sessionStructureId;
  }
}
