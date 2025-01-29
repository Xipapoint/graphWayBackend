import { ApiProperty } from '@nestjs/swagger';
import { BaseSessionDTO } from './base/BaseSessionDTO';

export class GraphSessionDTO extends BaseSessionDTO {
  @ApiProperty({
    description: 'Identifier for the algorithm',
    example: `${crypto.randomUUID()}`,
  })
  sessionAlgorithmId: string;

  @ApiProperty({
    type: [Number],
    description: 'Array of session vertex IDs',
  })
  vertexIds: number[];

  @ApiProperty({
    type: [Number],
    description: 'Array of session edge IDs',
  })
  edgeIds: number[];
}
