import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'src/core/session-components/libs/Transactional';

import { SessionStructureFactory } from 'src/core/session-components/domain/factories/SessionStructureFactory';
import { SessionStructureRepository } from 'src/core/session-components/domain/repositories/SessionStructureRepository';
import { InjectionToken } from '../../InjectToken';
import { CreateSessionStructureCommand } from '../CreateSessionStructureCommand';

@CommandHandler(CreateSessionStructureCommand)
export class CreateSessionStructureHandler
  implements ICommandHandler<CreateSessionStructureCommand, void>
{
  @Inject() private readonly sessionStructureFactory: SessionStructureFactory;
  @Inject(InjectionToken.SESSION_STRUCTURE_REPOSITORY)
  private readonly sessionStructureRepository: SessionStructureRepository;
  @Transactional()
  async execute(command: CreateSessionStructureCommand): Promise<void> {
    const isExists = await this.sessionStructureRepository.exists(
      command.title,
    );

    if (isExists) throw new Error('Session mode already exists');

    const sessionStructure = this.sessionStructureFactory.create({
      id: crypto.randomUUID(), // TODO: Implement module to create entity things
      ...command,
    });

    await this.sessionStructureRepository.save(sessionStructure);
    sessionStructure.commit();
  }
}
