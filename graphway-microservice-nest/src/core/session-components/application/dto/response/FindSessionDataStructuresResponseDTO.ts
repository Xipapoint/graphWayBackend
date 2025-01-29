import { SessionDataStructureDTO } from '../DTOEntities/SessionDataStructureDTO';
import { ApiProperty } from '@nestjs/swagger';

export class FindSessionDataStructuresResponseDTO {
  @ApiProperty({
    type: [SessionDataStructureDTO],
    description: 'List of session data structures',
  })
  readonly sessionDataStructures: SessionDataStructureDTO[];
}
