import _ from "lodash";
import {
  EventController,
  NotificationController,
  UserController,
} from "../../controller/controller";
import {
  EventRepository,
  GenericRepository,
  NotificationRepository,
  UserRepository,
} from "../../repository/repository";
import {
  EventService,
  NotificationService,
  UserService,
} from "../../service/service";
import { PrismaClient, User } from "@prisma/client";
import { GenericService } from "../../service/generic.service";
import { IUserCreateDto } from "../../service/interfaces/user.dto";

import {Event} from "@prisma/client";

// const userRepo = new UserRepository();
// const userService = new UserService(userRepo);
// const userController = new UserController(userService);
// const userRepository = new GenericRepository('User');

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);

// const notificationRepo = new NotificationRepository();
// const notificationService = new NotificationService(notificationRepo);
// const notificationController = new NotificationController(notificationService);

const withSuccess = (obj) => {
  try {
    return {
      data: obj,
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

const resolvers = {
  Query: {
    fetchEvents: async (parent, args, context) => {
        try {
          let events = null;
          if(_.isEmpty(args))
            events = await eventService.getAll();
          else
            events = await eventService.find(args);
          return withSuccess(events);
        } catch (error) {
          throw new Error(error);
        }
    },
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
        // const users: any[] = await userRepository.readAll();
        const users: User[] = await userService.getAll();
        const check = users.map((user) => ({
          id: user.id,
          display: user.userName,
          role: user.role,
          mobile: user.mobileNumber,
          password: user.passWord,
        }));
        return withSuccess(check);
      } catch (error) {
        throw new Error(error);
      }
    },
    // loginUser: async (parent, args, context) => {
    //   const getTokenInput = {
    //     mobile: args.mobile,
    //     password: args.passWord,
    //   };
    //   const { accessToken, refreshToken } = await userService.getUserToken(getTokenInput);
    //   context.res.cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     secure: true,
    //     expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    //   });
    //   return accessToken;
    // },
    getLoggedUser: async (parent, args, context) => {
      if (context.isAuthenticated) return { display: context?.isAuthenticated?.username }
      throw new Error("User is not logged in");
    },
    // refreshAccess: async (parent, args, context) => {
    //   const cookies = context?.req?.cookies;
    //   if(cookies?.refreshToken) {
    //     const accressToken = await userService.getAccessToken(cookies.refreshToken);
    //     return accressToken;
    //   }
    //   throw new Error("!! Invalid User !!");
    // }
  },
  Mutation: {
    createEvent: async (parent, args, context) => {
     try {
      const user = await userService.find({mobileNumber: 680});
      // console.log(context?.isAuthenticated.username);
      let ctrateEventInput = {
        ...args.input
      }

      if(ctrateEventInput.startDate) {
        const startDate = new Date(args.input.startDate);
        ctrateEventInput.startDate = startDate.toISOString();
      } else {
        ctrateEventInput.startDate = null;
      }

      if(ctrateEventInput.endDate) {
        const endDate = new Date(args.input.endDate);
        ctrateEventInput.endDate = endDate.toISOString();
      } else {
        ctrateEventInput.endDate = null;
      }

      const event = await eventService.create({...ctrateEventInput, userId:user[0].id });
      return withSuccess(event);
     } catch (error) {
      throw new Error(error);
     }
    },
    registerUser: async (parent, args, context) => {
      try {
        const userInput: IUserCreateDto = {
          mobile: args.input.mobile,
          username: args.input.userName,
          password: args.input.passWord,
        };
        const user = await userService.create(userInput);
        return withSuccess(user);
      } catch (error) {
        throw new Error(error);
      }
    },
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
