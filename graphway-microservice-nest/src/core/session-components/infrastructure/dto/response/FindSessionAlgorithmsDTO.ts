import { FindSessionAlgorithmsResult } from 'src/core/session-components/application/query/dto/FindSessionAlgorithmsResult';
import { SessionAlgorithmDTO } from '../DTOEntities/SessionAlgorithmDTO';
import { ApiProperty } from '@nestjs/swagger';

export class FindSessionAlgorithmsResponseDTO extends FindSessionAlgorithmsResult {
  @ApiProperty({
    type: [SessionAlgorithmDTO],
    description: 'List of session algorithms',
  })
  readonly sessionModes: SessionAlgorithmDTO[];
}
