import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectionToken } from '../../InjectToken';
import { FindSessionStructuresResult } from '../dto/FindsSessionStructuresResult';
import { FindSessionStructuresQuery } from '../queries/FindSessionStructuresQuery';
import { SessionStructureQuery } from '../SessionStructureQuery';

@QueryHandler(FindSessionStructuresQuery)
export class FindSessionModesHandler
  implements
    IQueryHandler<FindSessionStructuresQuery, FindSessionStructuresResult>
{
  @Inject(InjectionToken.SESSION_STRUCTURE_QUERY)
  readonly sessionStructureQuery: SessionStructureQuery;

  async execute(): Promise<FindSessionStructuresResult> {
    return this.sessionStructureQuery.find();
  }
}
