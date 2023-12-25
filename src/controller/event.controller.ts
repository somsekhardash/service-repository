import { CreateEventInput } from "../__generated__/resolvers-types";
import { eventsType } from "../database";
import { IEventCreateDto } from "../service/interfaces/event.dto";
import { EventService } from "../service/service";

export class EventController {
  constructor(private readonly _eventService: EventService) {}

  // async getAll() {
  //   try {
  //     const events = await this._eventService.getAll();
  //     return events;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // async find(requestData: any) {
  //   try {
  //     const events = await this._eventService.find(requestData);
  //     return events;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // async create(requestData: CreateEventInput) {
  //   try {
  //     const newEvent: IEventCreateDto = {
  //       userId: requestData.userId,
  //       name: requestData.title,
  //       description: requestData.description,
  //       type: requestData.type,
  //       startDate: requestData.startDate,
  //       frequency: requestData.frequency as eventsType,
  //     }
  //     const event = await this._eventService.create(newEvent);
  //     return event;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}
