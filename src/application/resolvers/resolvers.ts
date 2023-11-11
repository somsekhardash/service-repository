import { EventController, NotificationController, UserController } from "../../controller/controller";
import { EventRepository, NotificationRepository, UserRepository } from "../../repository/repository";
import { EventService, NotificationService, UserService } from "../../service/service";

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);


const eventRepo = new EventRepository();
const eventService = new EventService(eventRepo);
const eventController = new EventController(eventService);

const notificationRepo = new NotificationRepository();
const notificationService = new NotificationService(notificationRepo);
const notificationController = new NotificationController(notificationService);

const resolvers = {
  Query: {
    fetchEvents: async (parent, args, context) => {
        try {
          const expenses = await eventController.getAll(args);
          return {
            data: expenses.data,
            success: true,
          };
        } catch (error) {
          throw new Error(error);
        }
    },
    fetchNotifications: async (parent, args, context) => {
      try {
        const notifications = await notificationController.getAll(args);
        return {
          data: notifications.data,
          success: true,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    fetchUsers:  async (parent, args, context) => {
      try {
        const users = await userController.getAll(args);
        return {
          data: users.data,
          success: true,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
  }
};

export default resolvers;