import { IEvent } from "../database";
import { GenericService } from "./generic.service";
import { EventRepository } from "../repository/repository";

export class EventService extends GenericService<IEvent>{
    constructor(private readonly _eventRepository: EventRepository) {
      super(_eventRepository);
    }
}
