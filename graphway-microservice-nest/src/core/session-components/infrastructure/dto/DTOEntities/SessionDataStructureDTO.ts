import { ApiProperty } from '@nestjs/swagger';

export class SessionDataStructureDTO {
  @ApiProperty({
    example: `${crypto.randomUUID()}`,
    description: 'The unique identifier of the session data structure',
  })
  id: string;

  @ApiProperty({
    example: 'Data structure Title',
    description: 'The title of the session mode',
  })
  title: string;

  @ApiProperty({
    example: 'This is a description of the session data structure',
    description: 'The description of the session data structure',
  })
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image associated with the session data structure',
  })
  image: Buffer;
}
