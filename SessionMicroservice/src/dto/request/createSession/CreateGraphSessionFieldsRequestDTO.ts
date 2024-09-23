import { Alghorithm } from "../../../entities/types/Alghorithm"

// For creating graph session entity
export interface ICreateGraphSessionFieldsDTO{
    userId: string,
    alghorithm: Alghorithm
}