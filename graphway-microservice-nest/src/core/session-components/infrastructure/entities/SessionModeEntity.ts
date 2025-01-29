import { Entity } from 'typeorm';
import { BaseSessionComponentEntity } from './base/BaseSessionComponentEntity';

@Entity({ name: 'session-modes' })
export class SessionModeEntity extends BaseSessionComponentEntity {}
