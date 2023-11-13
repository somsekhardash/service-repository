import { eventsType } from "../../database";

export interface IEventCreateDto {
    userId: number;
    name: string;
    description: string;
    type: string;
    startDate: string;
    endDate?: string;
    frequency: eventsType;
}