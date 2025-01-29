import { SessionAlgorithmDTO } from '../DTOEntities/SessionAlgorithmDTO';
import { ApiProperty } from '@nestjs/swagger';

export class FindSessionAlgorithmsResponseDTO {
  @ApiProperty({
    type: [SessionAlgorithmDTO],
    description: 'List of session algorithms',
  })
  readonly sessionAlgorithms: SessionAlgorithmDTO[];
}
