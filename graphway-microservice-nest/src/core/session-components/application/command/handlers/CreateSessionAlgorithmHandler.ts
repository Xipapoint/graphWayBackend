import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'src/core/session-components/libs/Transactional';

import { InjectionToken } from '../../InjectToken';
import { CreateSessionAlgorithmCommand } from '../CreateSessionAlgorithmCommand';
import { SessionAlgorithmFactory } from 'src/core/session-components/domain/factories/SessionAlgorithmFactory';
import { SessionAlgorithmRepository } from 'src/core/session-components/domain/repositories/SessionAlgorithmRepository';

@CommandHandler(CreateSessionAlgorithmCommand)
export class CreateSessionAlgorithmHandler
  implements ICommandHandler<CreateSessionAlgorithmCommand, void>
{
  @Inject() private readonly sessionAlgorithmFactory: SessionAlgorithmFactory;
  @Inject(InjectionToken.SESSION_ALGORITHM_REPOSITORY)
  private readonly sessionAlgorithmRepository: SessionAlgorithmRepository;
  @Transactional()
  async execute(command: CreateSessionAlgorithmCommand): Promise<void> {
    const sessionType = this.sessionAlgorithmFactory.create({
      id: crypto.randomUUID(), // TODO: Implement module to create entity things
      ...command,
    });

    await this.sessionAlgorithmRepository.save(sessionType);
    sessionType.commit();
  }
}
