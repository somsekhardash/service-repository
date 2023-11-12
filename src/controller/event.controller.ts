import { EventService } from "../service/service";

export class EventController {
  constructor(private readonly _eventService: EventService) {}

  async getAll(requestData: any) {
    try {
      const events = await this._eventService.getAll();
      return events;
    } catch (error) {
      throw new Error(error);
    }
  }
}
