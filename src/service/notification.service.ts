import { INotificationDocument } from "../database";
import { GenericService } from "./generic.service";
import { NotificationRepository } from "../repository/repository";

export class NotificationService extends GenericService<INotificationDocument> {
  constructor(private readonly _notificationRepository: NotificationRepository) {
    super(_notificationRepository);
  }
}
