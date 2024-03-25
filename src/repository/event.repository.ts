import { GenericRepository } from "./generic.repository";
import { Event } from '@prisma/client';

export class EventRepository extends GenericRepository<Event> {
  constructor() {
    super('Event');
  }
  async find(data): Promise<Event[]> {
    try {
      if (data.nextDate) {
        return await this.model.findMany({
          where: {
            nextDate: {
              lte: data.nextDate
            }
          }
        });
      }
      if (data.month || data.year) {
        const events = await this.model.findMany();
        const check = events.filter((event) => {
          const d = new Date(String(event.nextDate));
          return ((Number(data.month) == d.getMonth()) && (Number(data.year) == d.getFullYear()))
        })
        return check;
      }
      const check =  await this.model.findMany({ where: data });
      return check
    } catch (error) {
      throw error;
    }
  }
}
