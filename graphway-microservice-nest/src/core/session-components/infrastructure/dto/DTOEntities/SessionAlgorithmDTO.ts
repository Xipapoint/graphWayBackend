import { ApiProperty } from '@nestjs/swagger';

export class SessionAlgorithmDTO {
  @ApiProperty({
    example: `${crypto.randomUUID()}`,
    description: 'The unique identifier of the session Algorithm',
  })
  id: string;

  @ApiProperty({
    example: 'Algorithm Title',
    description: 'The title of the session mode',
  })
  title: string;

  @ApiProperty({
    example: 'This is a description of the session Algorithm',
    description: 'The description of the session Algorithm',
  })
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image associated with the session Algorithm',
  })
  image: Buffer;
}
