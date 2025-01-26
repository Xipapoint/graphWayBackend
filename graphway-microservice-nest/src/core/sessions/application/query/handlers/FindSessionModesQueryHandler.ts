import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSessionModesResult } from '../dto/FindSessionModesResult';
import { FindSessionModesQuery } from '../queries/FindSessionModesQuery';
import { SessionModeQuery } from '../SessionModeQuery';
import { InjectionToken } from '../../InjectToken';
import { Inject } from '@nestjs/common';

@QueryHandler(FindSessionModesQuery)
export class FindSessionModesHandler
  implements IQueryHandler<FindSessionModesQuery, FindSessionModesResult>
{
  @Inject(InjectionToken.SESSION_MODE_QUERY)
  readonly sessionModeQuery: SessionModeQuery;

  async execute(): Promise<FindSessionModesResult> {
    return this.sessionModeQuery.find();
  }
}
