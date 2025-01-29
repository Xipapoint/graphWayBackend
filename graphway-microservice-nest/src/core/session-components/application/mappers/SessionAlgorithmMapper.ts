import { SessionAlgorithm } from '../../domain/entities/SessionAlgorithm';
import { SessionAlgorithmDTO } from '../dto/DTOEntities/SessionAlgorithmDTO';

export class SessionAlgorithmMapper {
  toDTO(sessionAlgorithm: SessionAlgorithm): SessionAlgorithmDTO {
    return {
      id: sessionAlgorithm.getId(),
      title: sessionAlgorithm.getTitle(),
      description: sessionAlgorithm.getDescription(),
      image: sessionAlgorithm.getImagePath(),
      sessionStructureIds: sessionAlgorithm.getSessionStructureId(),
    };
  }

  toDTOs(sessionAlgrotihmEntites: SessionAlgorithm[]): SessionAlgorithmDTO[] {
    const sessionAlgorithms: SessionAlgorithmDTO[] = [];
    for (const sessionAlgorithm of sessionAlgrotihmEntites) {
      sessionAlgorithms.push(this.toDTO(sessionAlgorithm));
    }
    return sessionAlgorithms;
  }
}
