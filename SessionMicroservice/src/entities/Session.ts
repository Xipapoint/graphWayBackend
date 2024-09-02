import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    BeforeInsert
  } from 'typeorm';
import { Vertex } from './Vertex';
import { Edge } from './Edge';
import { Security } from '../utils/security';
import { SessionTypes } from './SessionTypes';
import { SessionStructures } from './SessionStructures';
import { Alghorithm } from './Alghorithm';
  
  @Entity()
  export class Session {
    @PrimaryGeneratedColumn('uuid')
    id: number;
  
    @Column({ unique: true })
    visibleId: string;
  
    @Column({unique: false})
    sessionName: string;
    
    @Column({nullable: true})
    alghorithm?: Alghorithm

    @Column({ nullable: true, type: 'simple-array' })
    shortestVertices?: number[];

    @OneToMany(() => Vertex, vertex => vertex.vertexId)
    vertices: Vertex[];
  
    @OneToMany(() => Edge, edge => edge.session)
    edges: Edge[];
  
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