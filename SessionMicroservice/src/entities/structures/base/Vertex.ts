
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Session } from "../../Session";
import { BaseEntity } from "../../BaseEntity";
import { BaseStructureEntity } from "../../base/BaseStructureEntity";

@Entity('vertices')
export class Vertex extends BaseStructureEntity {

}