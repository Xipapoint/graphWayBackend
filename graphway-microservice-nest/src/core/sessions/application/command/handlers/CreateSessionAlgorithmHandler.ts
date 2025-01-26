import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'src/core/sessions/libs/Transactional';

import { InjectionToken } from '../../InjectToken';
import { CreateSessionAlgorithmCommand } from '../CreateSessionAlgorithmCommand';
import { SessionTypeFactory } from 'src/core/sessions/domain/factories/SessionDataStructureFactory';
import { SessionTypeRepository } from 'src/core/sessions/domain/repositories/SessionDataStructureRepository';

@CommandHandler(CreateSessionAlgorithmCommand)
export class CreateSessionAlgorithmHandler
  implements ICommandHandler<CreateSessionAlgorithmCommand, void>
{
  @Inject() private readonly sessionTypeFactory: SessionTypeFactory;
  @Inject(InjectionToken.SESSION_TYPE_REPOSITORY)
  private readonly sessionTypeRepository: SessionTypeRepository;
  @Transactional()
  async execute(command: CreateSessionAlgorithmCommand): Promise<void> {
    const sessionType = this.sessionTypeFactory.create({
      id: crypto.randomUUID(), // TODO: Implement module to create entity things
      ...command,
    });

    await this.sessionTypeRepository.save(sessionType);
    sessionType.commit();
  }
}
