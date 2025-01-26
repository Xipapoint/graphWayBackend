import { IQueryResult } from '@nestjs/cqrs';

export class FindSessionModesResult implements IQueryResult {
  constructor(
    readonly sessionModes: Readonly<{
      id: string;
      title: string;
      description: string;
      image: Buffer;
    }>[],
  ) {}
}
