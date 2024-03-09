import { GenericRepository } from "./generic.repository";
import {  Event } from '@prisma/client';

export class EventRepository extends GenericRepository<Event> {
  constructor() {
    super('Event');
  }
  async find(data): Promise<Event[]> {
    try {
      if (data.month || data.year) {
        const events = await this.model.findMany();
        const check = events.filter((event) => {
          const d = new Date(String(event.nextDate));
          return ((Number(data.month) == d.getMonth()) && (Number(data.year) == d.getFullYear()))
        })

        return check;
      }
      return await this.model.findMany({ where: data });
    } catch (error) {
      throw error;
    }
  }
}
