import { Column, Entity } from 'typeorm';
import { BaseSessionComponentEntity } from './base/BaseSessionComponentEntity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'session-structures' })
export class SessionStructureEntity extends BaseSessionComponentEntity {
  @ApiProperty({
    type: [String],
    description: 'Array of session data structure IDs',
  })
  @Column('simple-array')
  sessionDataStructureIds: string[];
}
