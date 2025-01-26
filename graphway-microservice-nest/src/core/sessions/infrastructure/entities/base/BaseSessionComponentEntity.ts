import { ApiProperty } from '@nestjs/swagger';
import { PrimaryColumn, Column } from 'typeorm';
import { BaseTypeormEntity } from './BaseTypeormEntity';

export class BaseSessionComponentEntity extends BaseTypeormEntity {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Session Title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'This is a description of the session mode.' })
  @Column()
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    example: 'image data in binary format',
  })
  @Column({ type: 'bytea' })
  image: Buffer;
}
