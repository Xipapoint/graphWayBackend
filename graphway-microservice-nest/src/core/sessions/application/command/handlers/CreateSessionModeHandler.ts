import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SessionModeFactory } from 'src/core/sessions/domain/factories/SessionModeFactory';
import { SessionModeRepository } from 'src/core/sessions/domain/repositories/SessionModeRepository';
import { Transactional } from 'src/core/sessions/libs/Transactional';
import { InjectionToken } from '../../InjectToken';
import { CreateSessionModeCommand } from '../CreateSessionModeCommand';

@CommandHandler(CreateSessionModeCommand)
export class CreateSessionModeHandler
  implements ICommandHandler<CreateSessionModeCommand, void>
{
  @Inject() private readonly sessionModeFactory: SessionModeFactory;
  @Inject(InjectionToken.SESSION_MODE_REPOSITORY)
  private readonly sessionModeRepository: SessionModeRepository;
  @Transactional()
  async execute(command: CreateSessionModeCommand): Promise<void> {
    const isExists = await this.sessionModeRepository.exists(command.title);

    if (isExists) throw new Error('Session mode already exists');

    const sessionType = this.sessionModeFactory.create({
      id: crypto.randomUUID(), // TODO: Implement module to create entity things
      ...command,
    });

    await this.sessionModeRepository.save(sessionType);
    sessionType.commit();
  }
}
