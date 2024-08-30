import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany
  } from 'typeorm';
import { Vertex } from './Vertex';
import { Edge } from './Edge';
  
  @Entity()
  export class Session {
    @PrimaryGeneratedColumn('uuid')
    id: number;
  
    @Column({ unique: true })
    visibleId: string;
  
    @Column()
    sessionName: string;

    @Column()
    sessionType: string

    @Column()
    sessionImage: string
  
    @Column()
    structType: string;
    
    @Column()
    structImage: string

    @Column()
    structDescription: string;
    
    @Column({nullable: true})
    alghorithm?: string

    @Column({nullable: true})
    alghorithmImage?: string

    @Column({nullable: true})
    alghorithmDescription?: string

    @OneToMany(() => Vertex, vertex => vertex.vertexId)
    vertices: Vertex[];
  
    @OneToMany(() => Edge, edge => edge.session)
    edges: Edge[];
  
    @Column({ nullable: true, type: 'simple-array' })
    shortestVertices?: number[];
  
    @Column()
    userId: string

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

  }