// import { IEventDocument } from "../database";
import { GenericService } from "./generic.service";
import { EventRepository } from "../repository/repository";
import { IEventService } from "./interfaces/type";
import { IEventCreateDto } from "./interfaces/event.dto";
import { Event } from "@prisma/client";
// implements IEventService
export class EventService extends GenericService<Event> {
  constructor(private readonly _eventRepository: EventRepository) {
    super(_eventRepository);
  }
  // async create(entity: IEventCreateDto): Promise<boolean> {
  //   // const created = await this._eventRepository.create(entity);
  //   // return created;
  //   return true;
  // }

  // async getAll() {
  //   const created = await this._eventRepository.readAll();
  //   return created;
  // }

  // async find(entity: Partial<Event>): Promise<Event[]> {
  //   return await this._eventRepository.find(entity);
  // }
}
