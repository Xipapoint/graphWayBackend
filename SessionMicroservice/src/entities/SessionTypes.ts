import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('sessionTypes')
export class SessionTypes{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    sessionTypeName: string;

    @Column()
    sessionTypeImage: string

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;


}