import { Entity, ManyToMany } from 'typeorm';
import { BaseSessionComponentEntity } from './base/BaseSessionComponentEntity';
import { SessionStructureEntity } from './SessionStructureEntity';

@Entity({ name: 'session-data-algorithms' })
export class SessionAlgorithmEntity extends BaseSessionComponentEntity {
  @ManyToMany(
    () => SessionStructureEntity,
    (sessionStructure) => sessionStructure.algorithms,
  )
  sessionStructures: SessionStructureEntity[];
}
