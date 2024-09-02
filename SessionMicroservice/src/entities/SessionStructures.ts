import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('sessinStructures')
export class SessionStructures{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    sessionStructureName: string;

    @Column()
    sessionStructureImage: string

    @Column()
    structDescription: string;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;


}