import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateSessionDataStructureRequestDTO {
  @IsString()
  @MinLength(2)
  @ApiProperty({ minLength: 2, maxLength: 8, example: 'Graph' })
  readonly title: string;

  @IsString()
  @ApiProperty({
    example: 'Choosen session data structure is Graph.',
  })
  readonly description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file for the session data structure',
  })
  readonly image: Buffer;
}
