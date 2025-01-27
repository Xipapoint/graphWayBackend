import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateSessionModeRequestDTO {
  @IsString()
  @MinLength(2)
  @ApiProperty({ minLength: 2, maxLength: 8, example: 'Console' })
  readonly title: string;

  @IsString()
  @ApiProperty({
    example:
      'Type of your session is Console. That means modifying your Graph structure or any other will be made through the input form.',
  })
  readonly description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file for the session mode',
  })
  readonly image: Buffer;
}
