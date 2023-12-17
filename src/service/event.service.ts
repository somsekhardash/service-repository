import { IEventDocument } from "../database";
import { GenericService } from "./generic.service";
import { EventRepository } from "../repository/repository";
import { IEventService } from "./interfaces/type";
import { IEventCreateDto } from "./interfaces/event.dto";

export class EventService
  extends GenericService<IEventDocument>
  implements IEventService
{
  // constructor(private readonly _eventRepository: EventRepository) {
  //   super(_eventRepository);
  // }

  // async create(entity: IEventCreateDto): Promise<boolean> {
  //   // const created = await this._eventRepository.create(entity);
  //   // return created;
  //   return true;
  // }
}
