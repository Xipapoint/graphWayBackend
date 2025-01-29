import { ApiProperty } from '@nestjs/swagger';

export class BaseSessionDTO {
  @ApiProperty({
    description: 'Unique identifier for the session',
    example: `${crypto.randomUUID()}`,
  })
  id: string;

  @ApiProperty({
    description: 'Title of the session',
    example: 'Homework for discrete mathematics',
  })
  title: string;

  @ApiProperty({
    format: 'binary',
    example: 'image data in binary format',
  })
  image: Buffer;

  @ApiProperty({
    description: 'Identifier for the data structure type',
    example: `${crypto.randomUUID()}`,
  })
  sessionDataStructureId: string;

  @ApiProperty({
    description: 'Identifier for the structure type of data structure',
    example: `${crypto.randomUUID()}`,
  })
  sessionStructureId: string;

  @ApiProperty({
    description: 'Identifier for the user',
    example: `${crypto.randomUUID()}`,
  })
  userId: string;

  @ApiProperty({
    description: 'Identifier for the session mode',
    example: `${crypto.randomUUID()}`,
  })
  sessionModeId: string;

  @ApiProperty({
    description: 'Identifier for the analytics',
    example: `${crypto.randomUUID()}`,
  })
  analyticsId: string;
}
