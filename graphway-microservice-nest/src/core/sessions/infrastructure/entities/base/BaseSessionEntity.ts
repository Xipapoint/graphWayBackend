import { Column, PrimaryColumn } from 'typeorm';
import { BaseTypeormEntity } from './BaseTypeormEntity';
import { ApiProperty } from '@nestjs/swagger';

export class BaseSessionEntity extends BaseTypeormEntity {
  @PrimaryColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the session',
    example: `${crypto.randomUUID()}`,
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'Title of the session',
    example: 'Homework for discrete mathematics',
  })
  title: string;

  @ApiProperty({
    format: 'binary',
    example: 'image data in binary format',
  })
  @Column({ type: 'bytea' })
  image: Buffer;

  @Column()
  @ApiProperty({
    description: 'Identifier for the data structure type',
    example: `${crypto.randomUUID()}`,
  })
  sessionDataStructureId: string;

  @Column()
  @ApiProperty({
    description: 'Identifier for the structure type of data structure',
    example: `${crypto.randomUUID()}`,
  })
  sessionStructureId: string;

  @Column()
  @ApiProperty({
    description: 'Identifier for the user',
    example: `${crypto.randomUUID()}`,
  })
  userId: string;

  @Column()
  @ApiProperty({
    description: 'Identifier for the session mode',
    example: `${crypto.randomUUID()}`,
  })
  sessionModeId: string;

  @Column()
  @ApiProperty({
    description: 'Identifier for the analytics',
    example: `${crypto.randomUUID()}`,
  })
  analyticsId: string;
}
