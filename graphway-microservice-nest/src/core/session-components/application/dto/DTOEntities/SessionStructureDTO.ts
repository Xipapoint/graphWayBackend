import { ApiProperty } from '@nestjs/swagger';

export class SessionStructureDTO {
  @ApiProperty({
    example: `${crypto.randomUUID()}`,
    description: 'The unique identifier of the session structure',
  })
  id: string;

  @ApiProperty({
    example: 'Structure Title',
    description: 'The title of the session structure',
  })
  title: string;

  @ApiProperty({
    example: 'This is a description of the session structure',
    description: 'The description of the session structure',
  })
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image associated with the session structure',
  })
  image: Buffer;

  @ApiProperty({
    example: `${crypto.randomUUID()}`,
    description:
      'The unique identifiers of the session Data Structures that are associated with the session Structure',
  })
  sessionDataStructureIds: string[];
}
