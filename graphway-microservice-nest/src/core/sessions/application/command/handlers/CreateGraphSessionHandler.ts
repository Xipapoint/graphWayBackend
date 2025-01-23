import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateGraphSessionCommand } from '../CreateGraphSessionCommand';

import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../InjectToken';
import { Transactional } from '../../../libs/Transactional';
import { GraphSessionFactory } from 'src/core/sessions/domain/factories/GraphSessionFactory';
import { GraphSessionRepository } from 'src/core/sessions/domain/repositories/GraphSessionRepository';

@CommandHandler(CreateGraphSessionCommand)
export class CreateGraphSessionHandler
  implements ICommandHandler<CreateGraphSessionCommand, void>
{
  private graphSessionFactory: GraphSessionFactory;

  @Inject(InjectionToken.GRAPH_SESSION_REPOSITORY)
  private graphSessionRepository: GraphSessionRepository;

  @Transactional()
  async execute(command: CreateGraphSessionCommand): Promise<void> {
    const graphSession = this.graphSessionFactory.create({
      id: crypto.randomUUID(),
      ...command,
    });
    await this.graphSessionRepository.save(graphSession);
    graphSession.commit();
  }
}
