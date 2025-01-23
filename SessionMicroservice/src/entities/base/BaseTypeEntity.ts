import { PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "../BaseEntity";

export class BaseTypeEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    imagePath: string;
}