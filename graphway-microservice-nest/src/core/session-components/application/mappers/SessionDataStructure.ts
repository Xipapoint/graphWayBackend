import { SessionDataStructure } from '../../domain/entities/SessionDataStructure';
import { SessionDataStructureDTO } from '../dto/DTOEntities/SessionDataStructureDTO';

export class SessionDataStructureMapper {
  toDTO(sessionDataStructure: SessionDataStructure): SessionDataStructureDTO {
    return {
      id: sessionDataStructure.getId(),
      title: sessionDataStructure.getTitle(),
      description: sessionDataStructure.getDescription(),
      image: sessionDataStructure.getImagePath(),
    };
  }

  toDTOs(
    sessionDataStructureEntites: SessionDataStructure[],
  ): SessionDataStructureDTO[] {
    const sessionDataStructures: SessionDataStructureDTO[] = [];
    for (const sessionDataStructure of sessionDataStructureEntites) {
      sessionDataStructures.push(this.toDTO(sessionDataStructure));
    }
    return sessionDataStructures;
  }
}
