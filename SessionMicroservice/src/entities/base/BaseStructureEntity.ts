import { BaseEntity } from "../BaseEntity";
import { Column, PrimaryColumn } from 'typeorm';

export class BaseStructureEntity extends BaseEntity{
    @PrimaryColumn('number')
    id: number

    @Column()
    isShortest: boolean
    
}