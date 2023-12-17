import { GenericRepository } from "./generic.repository";
import database, { INotificationDocument } from "../database";

export class NotificationRepository extends GenericRepository<INotificationDocument> {
  constructor() {
    super('Notification');
  }
}
