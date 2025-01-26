import { ApiProperty } from '@nestjs/swagger';
import { FindSessionModesResult } from 'src/core/sessions/application/query/dto/FindSessionModesResult';
import { SessionModeDTO } from '../DTOEntities/SessionModeDTO';

export class FindSessionModesResponseDTO extends FindSessionModesResult {
  @ApiProperty({ type: [SessionModeDTO], description: 'List of session modes' })
  readonly sessionModes: SessionModeDTO[];
}
