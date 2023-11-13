import { IEventDocument, IUserDocument } from "../../database";
import { IEventCreateDto } from "./event.dto";
import { IUserCreateDto } from "./user.dto";

export interface IUserService {
    create(data: IUserCreateDto): Promise<boolean>;
    getAll(): Promise<IUserDocument[]>;
    getById(id: number): Promise<IUserDocument>;
}

export interface IEventService {
    create(data: IEventCreateDto): Promise<boolean>;
    getAll(): Promise<IEventDocument[]>;
    getById(id: number): Promise<IEventDocument>;
}



