import { Entity } from 'typeorm';
import { BaseSessionComponentEntity } from './base/BaseSessionComponentEntity';

@Entity({ name: 'session_modes' })
export class SessionModeEntity extends BaseSessionComponentEntity {}
