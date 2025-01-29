import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseSessionEntity } from './base/BaseSessionEntity';

@Entity('graph-sessions')
export class GraphSessionEntity extends BaseSessionEntity {
  @Column()
  @ApiProperty({
    description: 'Identifier for the algorithm',
    example: `${crypto.randomUUID()}`,
  })
  sessionAlgorithmId: string;

  @ApiProperty({
    type: [Number],
    description: 'Array of session vertex IDs',
  })
  @Column('simple-array')
  vertexIds: number[];

  @ApiProperty({
    type: [Number],
    description: 'Array of session edge IDs',
  })
  @Column('simple-array')
  edgeIds: number[];
}
