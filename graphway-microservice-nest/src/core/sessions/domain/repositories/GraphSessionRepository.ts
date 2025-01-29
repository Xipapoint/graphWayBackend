import { GraphSession } from '../entities/GraphSession';
import { BaseSessionRepository } from './base/BaseSessionRepository';

export interface GraphSessionRepository
  extends BaseSessionRepository<GraphSession> {}
