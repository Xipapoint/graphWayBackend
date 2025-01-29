import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SessionDataStructureFactory } from '../../domain/factories/SessionDataStructureFactory';
import { SessionDataStructureRepository } from '../../domain/repositories/SessionDataStructureRepository';
import { SessionDataStructureDTO } from '../dto/DTOEntities/SessionDataStructureDTO';
import { CreateSessionDataStructureRequestDTO } from '../dto/request/CreateSessionDataStructureRequestDTO';
import { AlreadyExistsException } from '../exceptions/AlreadyExistsException';
import { InjectionToken } from '../InjectToken';
import { SessionDataStructureMapper } from '../mappers/SessionDataStructure';

@Injectable()
export class SessionDataStructureService {
  @Inject()
  private readonly sessionDataStructureFactory: SessionDataStructureFactory;
  @Inject(InjectionToken.SESSION_DATA_STRUCTURE_REPOSITORY)
  private readonly sessionDataStructureRepository: SessionDataStructureRepository;

  @Inject(InjectionToken.SESSION_DATA_STRUCTURE_MAPPER)
  private readonly sessionDataStructureMapper: SessionDataStructureMapper;

  async findAll(): Promise<SessionDataStructureDTO[]> {
    const sessionDataStructures =
      await this.sessionDataStructureRepository.findAll();
    if (!sessionDataStructures.length) {
      throw new NotFoundException('No session data structures was found');
    }
    return this.sessionDataStructureMapper.toDTOs(sessionDataStructures);
  }

  async create(props: CreateSessionDataStructureRequestDTO): Promise<void> {
    const isExists = await this.sessionDataStructureRepository.exists(
      props.title,
    );
    if (isExists) throw new AlreadyExistsException('Algorithm');
    const sessionMode = this.sessionDataStructureFactory.create({
      id: crypto.randomUUID(),
      ...props,
    });
    await this.sessionDataStructureRepository.save(sessionMode);
  }
}
