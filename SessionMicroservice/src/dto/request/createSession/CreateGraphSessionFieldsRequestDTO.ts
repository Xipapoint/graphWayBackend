import { Alghorithm } from "../../../entities/types/Alghorithm";
import { SessionTypes } from "../../../entities/types/SessionTypes";
import { sessionRouter } from '../../../router/sessionRouter';

export interface ICreateGraphSessionFieldsDTO{
    userId: string,
    alghorithm: Alghorithm
    sessionType: SessionTypes
}