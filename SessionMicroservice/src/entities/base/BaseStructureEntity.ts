import { BaseEntity } from "../BaseEntity";
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseStructureEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    index: number

    @Column()
    isShortest: boolean
    
}