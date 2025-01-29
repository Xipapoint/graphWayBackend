import { SessionStructure } from '../../domain/entities/SessionStructure';
import { SessionStructureDTO } from '../dto/DTOEntities/SessionStructureDTO';

export class SessionStructureMapper {
  toDTO(sessionStructure: SessionStructure): SessionStructureDTO {
    return {
      id: sessionStructure.getId(),
      title: sessionStructure.getTitle(),
      description: sessionStructure.getDescription(),
      image: sessionStructure.getImagePath(),
    };
  }

  toDTOs(sessionStructureEntites: SessionStructure[]): SessionStructureDTO[] {
    const sessionStructures: SessionStructureDTO[] = [];
    for (const sessionStructure of sessionStructureEntites) {
      sessionStructures.push(this.toDTO(sessionStructure));
    }
    return sessionStructures;
  }
}
