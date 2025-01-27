import { ApiProperty } from '@nestjs/swagger';

export class SessionModeDTO {
  @ApiProperty({
    example: `${crypto.randomUUID()}`,
    description: 'The unique identifier of the session mode',
  })
  id: string;

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
