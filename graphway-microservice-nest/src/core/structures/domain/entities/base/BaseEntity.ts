import { AggregateRoot } from "@nestjs/cqrs";

export abstract class BaseEntity extends AggregateRoot {
    protected createdAt: Date
    protected updatedAt: Date

    getCreatedAt(): Date {
        return this.createdAt
    }

    getUpdatedAt(): Date {
        return this.updatedAt
    }
}