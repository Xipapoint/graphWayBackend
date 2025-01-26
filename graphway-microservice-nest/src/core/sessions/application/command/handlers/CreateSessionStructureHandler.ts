import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'src/core/sessions/libs/Transactional';

import { InjectionToken } from '../../InjectToken';
import { CreateSessionStructureCommand } from '../CreateSessionStructureCommand';
import { SessionTypeFactory } from 'src/core/sessions/domain/factories/SessionTypesFactory';
import { SessionTypeRepository } from 'src/core/sessions/domain/repositories/SessionDataStructureRepository';

@CommandHandler(CreateSessionStructureCommand)
export class CreateSessionStructureHandler
  implements ICommandHandler<CreateSessionStructureCommand, void>
{
  @Inject() private readonly sessionTypeFactory: SessionTypeFactory;
  @Inject(InjectionToken.SESSION_TYPE_REPOSITORY)
  private readonly sessionTypeRepository: SessionTypeRepository;
  @Transactional()
  async execute(command: CreateSessionStructureCommand): Promise<void> {
    const sessionType = this.sessionTypeFactory.create({
      id: crypto.randomUUID(), // TODO: Implement module to create entity things
      ...command,
    });

    await this.sessionTypeRepository.save(sessionType);
    sessionType.commit();
  }
}
