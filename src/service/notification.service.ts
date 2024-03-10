import { NotificationRepository } from "../repository/repository";
import { Notification } from "@prisma/client";
import { GenericService } from "./generic.service";

export class NotificationService extends GenericService<Notification> {
  constructor(private readonly _notificationRepository: NotificationRepository) {
    super(_notificationRepository);
  }

  async find(args) {
    let uArgs = {...args};
    let tempDate = new Date();
    if(args.month) {
      tempDate.setMonth(args.month-1);
    }

    if(args.year) {
      tempDate.setFullYear(args.year || tempDate.getFullYear());
    }

    if(args.month || args.year) {
      delete uArgs.month;
      delete uArgs.year;

      var date = new Date(tempDate), y = date.getFullYear(), m = date.getMonth();
      const nextDate = {
        gte: new Date(y, m, 1),
        lte: new Date(y, m + 1, 0),
      }
      
      const paidDate = {
        gte: new Date(y, m, 1),
        lte: new Date(y, m + 1, 0),
      }
      uArgs = {
        OR:[{nextDate}, {paidDate}]
      }

    }
    return await this._notificationRepository.find(uArgs);
  }
}