import { SessionMode } from '../../domain/entities/SessionMode';
import { SessionModeDTO } from '../dto/DTOEntities/SessionModeDTO';

export class SessionModeMapper {
  toDTO(sessionMode: SessionMode): SessionModeDTO {
    return {
      id: sessionMode.getId(),
      title: sessionMode.getTitle(),
      description: sessionMode.getDescription(),
      image: sessionMode.getImagePath(),
    };
  }

  toDTOs(sessionModeEntites: SessionMode[]): SessionModeDTO[] {
    const sessionModes: SessionModeDTO[] = [];
    for (const sessionMode of sessionModeEntites) {
      sessionModes.push(this.toDTO(sessionMode));
    }
    return sessionModes;
  }
}
