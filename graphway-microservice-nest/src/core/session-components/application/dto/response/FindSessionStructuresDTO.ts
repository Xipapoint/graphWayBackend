import { ApiProperty } from '@nestjs/swagger';
import { SessionStructureDTO } from '../DTOEntities/SessionStructureDTO';

export class FindSessionStructuresResponseDTO {
  @ApiProperty({
    type: [SessionStructureDTO],
    description: 'List of session modes',
  })
  readonly sessionStructures: SessionStructureDTO[];
}
