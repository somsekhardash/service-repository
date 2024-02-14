import { NotificationRepository } from "../repository/repository";
import { Notification } from "@prisma/client";
import { GenericService } from "./generic.service";

export class NotificationService extends GenericService<Notification> {
  constructor(private readonly _notificationRepository: NotificationRepository) {
    super(_notificationRepository);
  }
}
