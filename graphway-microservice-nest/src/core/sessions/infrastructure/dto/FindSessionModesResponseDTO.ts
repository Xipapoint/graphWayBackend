import { ApiProperty } from '@nestjs/swagger';
import { FindSessionModesResult } from '../../application/query/dto/FindSessionModesResult';

class SessionMode {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the session mode',
  })
  id: number;

  @ApiProperty({
    example: 'Mode Title',
    description: 'The title of the session mode',
  })
  title: string;

  @ApiProperty({
    example: 'This is a description of the session mode',
    description: 'The description of the session mode',
  })
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image associated with the session mode',
  })
  image: Buffer;
}

export class FindSessionModesResponseDTO extends FindSessionModesResult {
  @ApiProperty({ type: [SessionMode], description: 'List of session modes' })
  readonly sessionModes: SessionMode[];
}
