import { GraphSession } from "../../../sessions/domain/entities/GraphSession"

export interface GraphSessionRepository {
    save: (account: GraphSession | GraphSession[]) => Promise<void>
    findById: (id: string) => Promise<GraphSession | null>
}