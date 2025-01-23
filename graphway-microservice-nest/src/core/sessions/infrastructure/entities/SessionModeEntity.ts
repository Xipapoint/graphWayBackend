import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseTypeormEntity } from './BaseTypeormEntity';

@Entity({ name: 'session_modes' })
export class SessionModeEntity extends BaseTypeormEntity {
  @ApiProperty({
    type: String,
    format: 'binary',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryColumn({ type: 'binary' })
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
  @Column({ type: 'blob' })
  image: Buffer;

  @ApiProperty({ type: Date, example: '2023-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: Date, example: '2023-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
