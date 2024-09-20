import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    BeforeInsert,
    BaseEntity
  } from 'typeorm';
import { Vertex } from './structures/Vertex';
import { Edge } from './structures/Edge';
import { Security } from '../utils/security';
import { SessionTypes } from './types/SessionTypes';
import { SessionStructures } from './types/SessionStructures';
import { Alghorithm } from './types/Alghorithm';
  
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

    @OneToMany( () => Vertex, vertex => vertex.id, {nullable: true})
    vertices?: Vertex[];
  
    @Column()
    userId: string

    @Column()
    sessionType: SessionTypes
  
    @Column()
    structType: SessionStructures;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @BeforeInsert()
    setSessionName(){
      this.sessionName = Security.generateRandomString()
    }

  } 