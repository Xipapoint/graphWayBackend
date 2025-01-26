import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSessionDataStructureCommand } from '../CreateSessionDataStructureCommand';
import { Inject } from '@nestjs/common';
import { SessionDataStructureFactory } from 'src/core/sessions/domain/factories/SessionDataStructureFactory';
import { SessionDataStructureRepository } from 'src/core/sessions/domain/repositories/SessionDataStructureRepository';
import { Transactional } from 'src/core/sessions/libs/Transactional';
import { InjectionToken } from '../../InjectToken';

@CommandHandler(CreateSessionDataStructureCommand)
export class CreateSessionDataStructureHandler
  implements ICommandHandler<CreateSessionDataStructureCommand, void>
{
  @Inject()
  private readonly sessionDataStructureFactory: SessionDataStructureFactory;
  @Inject(InjectionToken.SESSION_DATA_STRUCTURE_REPOSITORY)
  private readonly sessionDataStructureRepository: SessionDataStructureRepository;
  @Transactional()
  async execute(command: CreateSessionDataStructureCommand): Promise<void> {
    const isExists = await this.sessionDataStructureRepository.exists(
      command.title,
    );

    if (isExists) throw new Error('Session mode already exists');

    const sessionDataStructure = this.sessionDataStructureFactory.create({
      id: crypto.randomUUID(), // TODO: Implement module to create entity things
      ...command,
    });

    await this.sessionDataStructureRepository.save(sessionDataStructure);
    sessionDataStructure.commit();
  }
}
