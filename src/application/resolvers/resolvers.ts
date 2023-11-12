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

const withSuccess = (obj) => {
  try {
    return {
      data: obj,
      success: true
    }
  } catch (error) {
    throw error;
  }
}

const resolvers = {
  Query: {
    fetchEvents: async (parent, args, context) => {
        try {
          const expenses = await eventController.getAll(args);
          return withSuccess(expenses);
        } catch (error) {
          throw new Error(error);
        }
    },
    fetchNotifications: async (parent, args, context) => {
      try {
        const notifications = await notificationController.getAll(args);
        return withSuccess(notifications);
      } catch (error) {
        throw new Error(error);
      }
    },
    fetchUsers:  async (parent, args, context) => {
      try {
        const users = await userController.getAll(args);
        return withSuccess(users);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Event: {
    notifications: async (obj, args, context, info) => {
      try {
        const notifications = await notificationController.get({eventId: obj.id});
        return notifications;
      } catch (error) {
        throw new Error(error);
      }
    }
  },
};

export default resolvers;