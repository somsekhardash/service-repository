import { GenericRepository } from "./generic.repository";
import { Notification } from "@prisma/client";

export class NotificationRepository extends GenericRepository<Notification> {
  constructor() {
    super("Notification");
  }

  async find(data): Promise<Notification[]> {
    try {
      if (data.month || data.year) {
        const notifications = await this.model.findMany();
        const check = notifications.filter((note) => {
          return ((Number(data.month) == note.paidDateMonth) && (Number(data.year) == note.paidDateYear))
        })

        return check;
      }
      return await this.model.findMany({ where: data });
    } catch (error) {
      throw error;
    }
  }
}
