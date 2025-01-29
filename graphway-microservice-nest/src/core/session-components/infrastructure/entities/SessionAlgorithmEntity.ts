import { Column, Entity } from 'typeorm';
import { BaseSessionComponentEntity } from './base/BaseSessionComponentEntity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'session-algorithms' })
export class SessionAlgorithmEntity extends BaseSessionComponentEntity {
  @ApiProperty({
    type: [String],
    description: 'Array of session structure IDs',
  })
  @Column('simple-array')
  sessionStructureIds: string[];
}
