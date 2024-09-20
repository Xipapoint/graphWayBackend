import { BaseEntity, BeforeInsert, Column, PrimaryGeneratedColumn } from "typeorm";
import { SessionTypes } from "../types/SessionTypes";
import { Security } from "../../utils/security";

 export class BaseSessionEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: false})
    sessionName: string;

    @Column({nullable: true})
    sessionImagePath?: string;

    @Column()
    userId: string

    @Column()
    sessionType: SessionTypes

    @BeforeInsert()
    setSessionName(){
      this.sessionName = Security.generateRandomString()
    }
 }