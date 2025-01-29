import { Entity } from 'typeorm';
import { BaseSessionComponentEntity } from './base/BaseSessionComponentEntity';

@Entity({ name: 'session-structures' })
export class SessionStructureEntity extends BaseSessionComponentEntity {}
