import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectionToken } from '../../InjectionToken';
import { CreateGraphSessionCommand } from '../CreateSessionCommand';
import generateRandomTitle from '../../../libs/utils';
import { GraphSessionFactory } from '../../../domain/factories/GraphSessionFactory';
import { GraphSessionRepository } from '../../../domain/repositories/GraphSessionRepository';
import { Transactional } from '../../../libs/Transactional';
@CommandHandler(CreateGraphSessionCommand)
export class CreateGraphSessionHandler
  implements ICommandHandler<CreateGraphSessionCommand, void>
{
  @Inject() private graphSessionFactory: GraphSessionFactory;

  @Inject(InjectionToken.GRAPH_SESSION_REPOSITORY)
  private graphSessionRepository: GraphSessionRepository;

  @Transactional()
  async execute(command: CreateGraphSessionCommand): Promise<void> {
    const graphSession = this.graphSessionFactory.create({
      id: crypto.randomUUID(),
      title: generateRandomTitle(),
      ...command,
    });
    graphSession.createdGraphSession();
    await this.graphSessionRepository.save(graphSession);
    graphSession.commit();
  }
}
