import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SessionStructureFactory } from '../../domain/factories/SessionStructureFactory';
import { SessionStructureRepository } from '../../domain/repositories/SessionStructureRepository';
import { SessionStructureDTO } from '../dto/DTOEntities/SessionStructureDTO';
import { CreateSessionStructureRequestDTO } from '../dto/request/CreateSessionStructureRequestDTO';
import { AlreadyExistsException } from '../exceptions/AlreadyExistsException';
import { InjectionToken } from '../InjectToken';
import { SessionStructureMapper } from '../mappers/SessionStructureMapper';

@Injectable()
export class SessionStructureService {
  @Inject() private readonly sessionStructureFactory: SessionStructureFactory;
  @Inject(InjectionToken.SESSION_STRUCTURE_REPOSITORY)
  private readonly sessionStructureRepository: SessionStructureRepository;

  @Inject(InjectionToken.SESSION_STRUCTURE_MAPPER)
  private readonly sessionStructureMapper: SessionStructureMapper;

  async findAll(): Promise<SessionStructureDTO[]> {
    const sessionStructures = await this.sessionStructureRepository.findAll();
    if (!sessionStructures.length) {
      throw new NotFoundException('No session structures was found');
    }
    return this.sessionStructureMapper.toDTOs(sessionStructures);
  }

  async findSessionStructuresByDataStructureId(
    dataStructureId: string,
  ): Promise<SessionStructureDTO[]> {
    const sessionStructures =
      await this.sessionStructureRepository.findStructuresByDataStructureId(
        dataStructureId,
      );
    return this.sessionStructureMapper.toDTOs(sessionStructures);
  }

  async create(props: CreateSessionStructureRequestDTO): Promise<void> {
    const isExists = await this.sessionStructureRepository.exists(props.title);
    if (isExists) throw new AlreadyExistsException('Algorithm');
    const sessionMode = this.sessionStructureFactory.create({
      id: crypto.randomUUID(),
      ...props,
    });
    await this.sessionStructureRepository.save(sessionMode);
  }
}
