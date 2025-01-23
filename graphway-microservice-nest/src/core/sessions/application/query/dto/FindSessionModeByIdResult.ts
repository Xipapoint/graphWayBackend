import { IQueryResult } from '@nestjs/cqrs';

export class FindSessionModeByIdResult implements IQueryResult {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly image: Buffer;
}
