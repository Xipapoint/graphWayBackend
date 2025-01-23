import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'src/core/sessions/libs/Transactional';
import { GraphSessionRepository } from '../../../domain/repositories/GraphSessionRepository';
import { InjectionToken } from '../../InjectToken';
import { UpdateGraphSessionStructureCommand } from '../UpdateGraphSessionStructureCommand';

@CommandHandler(UpdateGraphSessionStructureCommand)
export class UpdateGraphSessionStructureHandler
  implements ICommandHandler<UpdateGraphSessionStructureCommand, void>
{
  @Inject(InjectionToken.GRAPH_SESSION_REPOSITORY)
  private readonly graphSessionRepository: GraphSessionRepository;
  @Transactional()
  async execute(command: UpdateGraphSessionStructureCommand): Promise<void> {
    const { id, verticesId, edgesId } = command;
    const graphSession = await this.graphSessionRepository.findById(id);
    if (!graphSession) throw new NotFoundException('Graph session not found');
    graphSession.update(verticesId, edgesId);
    await this.graphSessionRepository.save(graphSession);
    graphSession.commit();
  }
}
