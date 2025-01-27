import { Entity } from 'typeorm';
import { BaseSessionComponentEntity } from './base/BaseSessionComponentEntity';

@Entity({ name: 'session-data-structures' })
export class SessionDataStructureEntity extends BaseSessionComponentEntity {}
