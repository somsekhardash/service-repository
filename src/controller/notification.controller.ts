import { NotificationService } from "../service/service";

export class NotificationController {
  constructor(private readonly _notificationService: NotificationService) {}

  async getAll(requestData: any) {
    try {
      const notifications = await this._notificationService.getAll();
      return {
        data: notifications,
        success: true,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
