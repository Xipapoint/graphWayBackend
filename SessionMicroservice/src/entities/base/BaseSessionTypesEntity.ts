import { PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "../BaseEntity";

export class BaseSessionTypesEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    imagePath: string;
}