import { FindSessionComponentByIdResult } from './base/FindSessionComponentByIdResult';

export class FindSessionModeByIdResult extends FindSessionComponentByIdResult {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly image: Buffer;
}
