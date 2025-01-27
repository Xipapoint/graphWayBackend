import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectionToken } from '../../InjectToken';
import { FindSessionDataStructuresResult } from '../dto/FindSessionDataStructuresResult';
import { FindSessionDataStructuresQuery } from '../queries/FindSessionDataStructuresQuery';
import { FindSessionModesQuery } from '../queries/FindSessionModesQuery';
import { SessionDataStructuresQuery } from '../SessionDataStructureQuery';

@QueryHandler(FindSessionModesQuery)
export class FindSessionModesHandler
  implements
    IQueryHandler<
      FindSessionDataStructuresQuery,
      FindSessionDataStructuresResult
    >
{
  @Inject(InjectionToken.SESSION_DATA_STRUCTURE_QUERY)
  readonly sessionDataStructureQuery: SessionDataStructuresQuery;

  async execute(): Promise<FindSessionDataStructuresResult> {
    return this.sessionDataStructureQuery.find();
  }
}
