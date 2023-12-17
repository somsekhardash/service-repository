import _ from 'lodash';
import { EventController, NotificationController, UserController } from "../../controller/controller";
import { EventRepository, GenericRepository, NotificationRepository, UserRepository } from "../../repository/repository";
import { EventService, NotificationService, UserService } from "../../service/service";
import { PrismaClient, User } from "@prisma/client";

// const userRepo = new UserRepository();
// const userService = new UserService(userRepo);
// const userController = new UserController(userService);


const userRepository = new GenericRepository('User'); 

// const eventRepo = new EventRepository();
// const eventService = new EventService(eventRepo);
// const eventController = new EventController(eventService);

// const notificationRepo = new NotificationRepository();
// const notificationService = new NotificationService(notificationRepo);
// const notificationController = new NotificationController(notificationService);

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
    // fetchEvents: async (parent, args, context) => {
    //     try {
    //       const events = _.isEmpty(args) ? await eventController.getAll() : await eventController.find(args);
    //       return withSuccess(events);
    //     } catch (error) {
    //       throw new Error(error);
    //     }
    // },
    // fetchNotifications: async (parent, args, context) => {
    //   try {
    //     const notifications = await notificationController.getAll(args);
    //     return withSuccess(notifications);
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // },
    fetchUsers: async (parent, args, context) => {
      try {
        // const users = await userController.getAll(args);
        const users: any[] = await userRepository.readAll();
        console.log(users);
        const check = users.map(user => ({
          id: user.id,
          display: user.userName,
          role: user.role,
          mobile: user.mobileNumber,
          password: user.passWord
        }))
        return withSuccess(check);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // createEvent: async (parent, args, context) => {
    //  try {
    //   const event = await eventController.create(args.input);
    //   return withSuccess(event);
    //  } catch (error) {
    //   throw new Error(error);
    //  }
    // },
    registerUser: async (parent, args, context) => {
      try {
        const userInput:Partial<User> = {
          mobileNumber: args.input.mobile,
          userName: args.input.userName,
          passWord:  args.input.passWord,
        }
        const user = await userRepository.create(userInput);
        return withSuccess(user);
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Event: {
    // notifications: async (obj, args, context, info) => {
    //   try {
    //     const notifications = await notificationController.get({eventId: obj.id});
    //     return notifications;
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // }
  },
};

export default resolvers;