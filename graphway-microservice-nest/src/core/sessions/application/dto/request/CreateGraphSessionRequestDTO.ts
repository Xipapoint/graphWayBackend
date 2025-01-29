import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import * as crypto from 'crypto';

export class CreateGraphSessionRequestDTO {
  @ApiProperty({
    description: 'Unique identifier for the session',
    example: `${crypto.randomUUID()}`,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    format: 'binary',
    example: 'image data in binary format',
  })
  @IsNotEmpty()
  image: Buffer;

  @ApiProperty({
    description: 'Identifier for the data structure type',
    example: `${crypto.randomUUID()}`,
  })
  @IsUUID()
  sessionDataStructureId: string;

  @ApiProperty({
    description: 'Identifier for the structure type of data structure',
    example: `${crypto.randomUUID()}`,
  })
  @IsUUID()
  sessionStructureId: string;

  @ApiProperty({
    description: 'Identifier for the user',
    example: `${crypto.randomUUID()}`,
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Identifier for the session mode',
    example: `${crypto.randomUUID()}`,
  })
  @IsUUID()
  sessionModeId: string;

  @ApiProperty({
    description: 'Identifier for the analytics',
    example: `${crypto.randomUUID()}`,
  })
  @IsUUID()
  analyticsId: string;

  @ApiProperty({
    description: 'Identifier for the algorithm',
    example: `${crypto.randomUUID()}`,
  })
  @IsUUID()
  sessionAlgorithmId: string;

  @ApiProperty({
    type: [Number],
    description: 'Array of session vertex IDs',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  vertexIds: number[];

  @ApiProperty({
    type: [Number],
    description: 'Array of session edge IDs',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  edgeIds: number[];
}
