import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSessionDataStructureCommand } from '../CreateSessionDataStructureCommand';
import { Inject } from '@nestjs/common';
import { SessionTypeFactory } from 'src/core/sessions/domain/factories/SessionTypesFactory';
import { SessionTypeRepository } from 'src/core/sessions/domain/repositories/SessionDataStructureRepository';
import { Transactional } from 'src/core/sessions/libs/Transactional';
import { InjectionToken } from '../../InjectToken';

@CommandHandler(CreateSessionDataStructureCommand)
export class CreateSessionDataStructureHandler
  implements ICommandHandler<CreateSessionDataStructureCommand, void>
{
  @Inject() private readonly sessionTypeFactory: SessionTypeFactory;
  @Inject(InjectionToken.SESSION_TYPE_REPOSITORY)
  private readonly sessionTypeRepository: SessionTypeRepository;
  @Transactional()
  async execute(command: CreateSessionDataStructureCommand): Promise<void> {
    const sessionType = this.sessionTypeFactory.create({
      id: crypto.randomUUID(), // TODO: Implement module to create entity things
      ...command,
    });

    await this.sessionTypeRepository.save(sessionType);
    sessionType.commit();
  }
}
