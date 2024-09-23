import { Structure } from "../../../entities/types/Structures";

// For creating tree session entity
export interface ICreateTreeSessionFieldsDTO{
    userId: string,
    structure: Structure
}