import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    BeforeInsert,
    BaseEntity
  } from 'typeorm';
import { Security } from '../utils/security';
import { Alghorithm } from './types/Alghorithm';
import { Type } from './types/Type';
import { Structure } from './types/Structures';
  
 @Entity('sessions')
  export class Session extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({unique: false})
    sessionName: string;

    @Column({nullable: true})
    sessionImagePath?: string;
    
    @Column({nullable: true})
    alghorithm?: Alghorithm

    @Column({ nullable: true, type: 'simple-array' })
    shortestVertices?: number[];
  
    @Column()
    userId: string

    @Column()
    sessionType: Type
  
    @Column()
    structType: Structure;

    @BeforeInsert()
    setSessionName(){
      this.sessionName = Security.generateRandomString()
    }

  } 