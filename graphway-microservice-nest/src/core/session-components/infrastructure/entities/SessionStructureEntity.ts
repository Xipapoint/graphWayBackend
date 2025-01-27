import { Entity, ManyToMany } from 'typeorm';
import { BaseSessionComponentEntity } from './base/BaseSessionComponentEntity';
import { SessionAlgorithmEntity } from './SessionAlgorithmEntity';

@Entity({ name: 'session-data-structures' })
export class SessionStructureEntity extends BaseSessionComponentEntity {
  @ManyToMany(
    () => SessionAlgorithmEntity,
    (sessionAlgorithm) => sessionAlgorithm.sessionStructures,
  )
  algorithms: SessionAlgorithmEntity[];
}
