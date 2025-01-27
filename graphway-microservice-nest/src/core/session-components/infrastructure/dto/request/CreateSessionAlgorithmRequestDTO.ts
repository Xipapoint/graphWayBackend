import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateSessionAlgorithmRequestDTO {
  @IsString()
  @MinLength(2)
  @ApiProperty({ minLength: 2, maxLength: 8, example: 'Dikstra algorithm' })
  readonly title: string;

  @IsString()
  @ApiProperty({
    example: 'Choosen session algorithm is Dikstra.',
  })
  readonly description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file for the session algorithm',
  })
  readonly image: Buffer;

  @IsString()
  @ApiProperty({ example: `${crypto.randomUUID()}` })
  readonly sessionStructureId: string;
}
