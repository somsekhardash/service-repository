import { NotificationService } from "../service/service";

export class NotificationController {
  constructor(private readonly _notificationService: NotificationService) {}

  async getAll(requestData: any) {
    try {
      const notifications = await this._notificationService.getAll();
      return notifications;
    } catch (error) {
      throw new Error(error);
    }
  }

  async get(requestData: any) {
    try {
      const notifications  = await this._notificationService.find(requestData);
      return notifications;
    } catch (error) {
      throw new Error(error);
    }
    
  }
}
