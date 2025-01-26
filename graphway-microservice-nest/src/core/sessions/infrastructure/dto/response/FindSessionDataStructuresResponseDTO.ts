import { FindSessionDataStructuresResult } from 'src/core/sessions/application/query/dto/FindSessionDataStructuresResult';
import { SessionDataStructureDTO } from '../DTOEntities/SessionDataStructureDTO';
import { ApiProperty } from '@nestjs/swagger';

export class FindSessionDataStructuresResponseDTO extends FindSessionDataStructuresResult {
  @ApiProperty({
    type: [SessionDataStructureDTO],
    description: 'List of session data structures',
  })
  readonly sessionDataStructures: SessionDataStructureDTO[];
}
