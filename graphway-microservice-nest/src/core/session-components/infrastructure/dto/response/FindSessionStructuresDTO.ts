import { ApiProperty } from '@nestjs/swagger';
import { FindSessionModesResult } from 'src/core/session-components/application/query/dto/FindSessionModesResult';
import { SessionModeDTO } from '../DTOEntities/SessionModeDTO';

export class FindSessionStructuresResponseDTO extends FindSessionModesResult {
  @ApiProperty({ type: [SessionModeDTO], description: 'List of session modes' })
  readonly sessionModes: SessionModeDTO[];
}
