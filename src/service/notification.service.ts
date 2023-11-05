import { INotification } from "../database";
import { GenericService } from "./generic.service";
import { NotificationRepository } from "../repository/repository";

export class NotificationService extends GenericService<INotification> {
  constructor() {
    super(new NotificationRepository());
  }
}
