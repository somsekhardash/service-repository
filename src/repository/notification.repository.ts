import { GenericRepository } from "./generic.repository";
import database, { INotification } from "../database";

export class NotificationRepository extends GenericRepository<INotification> {
  constructor() {
    super(database.notificationDB);
  }
}
