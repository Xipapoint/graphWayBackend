import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateSessionStructureRequestDTO {
  @IsString()
  @MinLength(2)
  @ApiProperty({ minLength: 2, example: 'Directed graph' })
  readonly title: string;

  @IsString()
  @ApiProperty({
    example: 'Choosen session data structure is Graph.',
  })
  readonly description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file for the session structure',
  })
  readonly image: Buffer;
}
