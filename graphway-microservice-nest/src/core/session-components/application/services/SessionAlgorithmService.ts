import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SessionAlgorithmFactory } from '../../domain/factories/SessionAlgorithmFactory';
import { SessionAlgorithmRepository } from '../../domain/repositories/SessionAlgorithmRepository';
import { SessionAlgorithmDTO } from '../dto/DTOEntities/SessionAlgorithmDTO';
import { CreateSessionAlgorithmRequestDTO } from '../dto/request/CreateSessionAlgorithmRequestDTO';
import { AlreadyExistsException } from '../exceptions/AlreadyExistsException';
import { InjectionToken } from '../InjectToken';
import { SessionAlgorithmMapper } from '../mappers/SessionAlgorithmMapper';

@Injectable()
export class SessionAlgorithmService {
  @Inject() private readonly sessionAlgorithmFactory: SessionAlgorithmFactory;
  @Inject(InjectionToken.SESSION_ALGORITHM_REPOSITORY)
  private readonly sessionAlgorithmRepository: SessionAlgorithmRepository;

  @Inject(InjectionToken.SESSION_ALGORITHM_MAPPER)
  private readonly sessionAlgorithmMapper: SessionAlgorithmMapper;

  async findAll(): Promise<SessionAlgorithmDTO[]> {
    const sessionAlgorithms = await this.sessionAlgorithmRepository.findAll();
    if (!sessionAlgorithms.length) {
      throw new NotFoundException('No session algorithms found');
    }
    return this.sessionAlgorithmMapper.toDTOs(sessionAlgorithms);
  }

  async create(props: CreateSessionAlgorithmRequestDTO): Promise<void> {
    const isExists = await this.sessionAlgorithmRepository.exists(props.title);
    if (isExists) throw new AlreadyExistsException('Algorithm');
    const sessionMode = this.sessionAlgorithmFactory.create({
      id: crypto.randomUUID(),
      ...props,
    });
    await this.sessionAlgorithmRepository.save(sessionMode);
  }

  async findSessionAlgorithmsByStructureId(
    structureId: string,
  ): Promise<SessionAlgorithmDTO[]> {
    const sessionAlgorithms =
      await this.sessionAlgorithmRepository.findAlgorithmsByStructureId(
        structureId,
      );
    return this.sessionAlgorithmMapper.toDTOs(sessionAlgorithms);
  }
}
