import { IQueryResult } from '@nestjs/cqrs';

export class FindResult<T> implements IQueryResult {
  constructor(readonly items: Readonly<T[]>) {}
}
