import { ApiProperty } from '@nestjs/swagger';
import { SessionModeDTO } from '../DTOEntities/SessionModeDTO';

export class FindSessionModesResponseDTO {
  @ApiProperty({ type: [SessionModeDTO], description: 'List of session modes' })
  readonly sessionModes: SessionModeDTO[];
}
