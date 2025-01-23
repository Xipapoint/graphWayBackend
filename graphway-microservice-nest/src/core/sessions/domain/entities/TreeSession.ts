import { BaseSession } from "./base/BaseSession";

export class TreeSession extends BaseSession {
    private sessionStructureId: number;

    getSessionStructureId(): number {
        return this.sessionStructureId;
    }
    
    setSessionStructureId(sessionStructureId: number): void {
        this.sessionStructureId = sessionStructureId;
    }
}