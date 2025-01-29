import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SessionModeFactory } from '../../domain/factories/SessionModeFactory';
import { SessionModeRepository } from '../../domain/repositories/SessionModeRepository';
import { SessionModeDTO } from '../dto/DTOEntities/SessionModeDTO';
import { CreateSessionModeRequestDTO } from '../dto/request/CreateSessionModeRequestDTO';
import { AlreadyExistsException } from '../exceptions/AlreadyExistsException';
import { InjectionToken } from '../InjectToken';
import { SessionModeMapper } from '../mappers/SessionModeMapper';

@Injectable()
export class SessionModeService {
  @Inject() private readonly sessionModeFactory: SessionModeFactory;
  @Inject(InjectionToken.SESSION_MODE_REPOSITORY)
  private readonly sessionModeRepository: SessionModeRepository;

  @Inject(InjectionToken.SESSION_MODE_MAPPER)
  private readonly sessionModeMapper: SessionModeMapper;

  async findAll(): Promise<SessionModeDTO[]> {
    const sessionModes = await this.sessionModeRepository.findAll();
    if (!sessionModes.length) {
      throw new NotFoundException('No session modes found');
    }
    return this.sessionModeMapper.toDTOs(sessionModes);
  }

  async create(props: CreateSessionModeRequestDTO): Promise<void> {
    const isExists = await this.sessionModeRepository.exists(props.title);
    if (isExists) throw new AlreadyExistsException('Algorithm');
    const sessionMode = this.sessionModeFactory.create({
      id: crypto.randomUUID(),
      ...props,
    });
    await this.sessionModeRepository.save(sessionMode);
  }
}
