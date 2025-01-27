import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectionToken } from '../../InjectToken';
import { FindSessionAlgorithmsResult } from '../dto/FindSessionAlgorithmsResult';
import { FindSessionAlgorithmsQuery } from '../queries/FindSessionAlgorithmsQuery';
import { SessionAlgorithmQuery } from '../SessionAlgorithmQuery';

@QueryHandler(FindSessionAlgorithmsQuery)
export class FindSessionAlgorithmsHandler
  implements
    IQueryHandler<FindSessionAlgorithmsQuery, FindSessionAlgorithmsResult>
{
  @Inject(InjectionToken.SESSION_ALGORITHM_QUERY)
  readonly sessionAlgorithmQuery: SessionAlgorithmQuery;

  async execute(): Promise<FindSessionAlgorithmsResult> {
    return this.sessionAlgorithmQuery.find();
  }
}
