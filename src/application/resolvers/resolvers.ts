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

const notificationRepo = new NotificationRepository();
const notificationService = new NotificationService(notificationRepo);
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
    doMigration: async (parent, args, context) => {
      try {
        const events = await eventService.getAll();
        events.forEach(async (event) => {
          const notifications = await notificationService.find({ eventId: event.id });
          const latestNoteNextDate = notifications[notifications.length - 1]?.nextDate || null;
          const updatedEvent =  await eventService.update( event.id as any, { nextDate: latestNoteNextDate});
          console.log(updatedEvent);
        });
        return true;
      } catch (error) {
        throw error;
      }
    },  
    fetchEvents: async (parent, args, context) => {
        try {
          let events = null;
          if(_.isEmpty(args))
            events = await eventService.getAll();
          else{
            if(args.title) {
              args.name = args.title;
              delete args.title;
            }
            events = await eventService.find(args);
          }
          return withSuccess(events);
        } catch (error) {
          throw new Error(error);
        }
    },
    fetchNotifications: async (parent, args, context) => {
      try {
        let notifications = null;
        if(_.isEmpty(args)) {
          notifications = await notificationService.getAll();
        } else {
          notifications = await notificationService.find(args);
        }
        return withSuccess(notifications);
      } catch (error) {
        throw new Error(error);
      }
    },
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
      let createEventInput = {
        ...args.input
      }

      if(createEventInput.startDate) {
        const startDate = new Date(args.input.startDate);
        createEventInput.startDate = startDate.toISOString();
      } else {
        createEventInput.startDate = null;
      }

      if(createEventInput.endDate) {
        const endDate = new Date(args.input.endDate);
        createEventInput.endDate = endDate.toISOString();
      } else {
        createEventInput.endDate = null;
      }

      const event = await eventService.create({...createEventInput, userId:user[0].id });
      return withSuccess(event);
     } catch (error) {
      throw new Error(error);
     }
    },
    createNotification: async (parent, args, context) => {
      try {
        let createNotificationInput = {
          ...args.input
        };

        if(createNotificationInput.paidDate) {
          const paidDate = new Date(args.input.paidDate);
          createNotificationInput.paidDate = paidDate.toISOString();
        } else {
          createNotificationInput.paidDate = null;
        }

        if(createNotificationInput.nextDate) {
          const nextDate = new Date(args.input.nextDate);
          createNotificationInput.nextDate = nextDate.toISOString();
        } else {
          createNotificationInput.nextDate = null;
        }

        const notification = await notificationService.create({...createNotificationInput });

        const foundEvent = await eventService.find({id: notification.eventId});
        if(foundEvent[0] && (new Date(notification.nextDate) >  new Date(foundEvent[0].nextDate))) {
            const result  = await eventService.update(notification.eventId, {nextDate: notification.nextDate});
            console.log(result);
        }
        return withSuccess(notification);
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
    updateEvent: async (parent, args, context) => {
      try {
        let createEventInput = {
          ...args.input.data
        }
 
        const event: any = await eventService.find({id: createEventInput.id});
        // console.log(context?.isAuthenticated.username);

        if(!event[0].id) {
          throw new Error("Event Not Found !!");
        }
         
        if(createEventInput.startDate) {
          const startDate = new Date(createEventInput.startDate);
          createEventInput.startDate = startDate.toISOString();
        } 
  
        if(createEventInput.endDate) {
          const endDate = new Date(createEventInput.endDate);
          createEventInput.endDate = endDate.toISOString();
        } 

        const {id, ...rest} = createEventInput;
        const newEvent = await eventService.update(id ,rest);
        return withSuccess(newEvent);
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteNotification: async (parent, args, context) => {
      try {
        const notification = await notificationService.delete(args.id);
        if(!!notification)
          return withSuccess(notification);
        else 
          throw new Error("Something went wrong");
      } catch (error) {
        throw new Error(error);
      }
    },
    updateNotification: async (parent, args, context) => {
      try {
        let updateNotificationInput = {
          ...args.input.data
        }
 
        const notification: any = await notificationService.find({id: updateNotificationInput.id});

        console.log(notification, "notification");

        if(!notification[0]?.id) {
          throw new Error("Notification Not Found !!");
        }
         
        if(updateNotificationInput.createdDate) {
          const paidDate = new Date(updateNotificationInput.createdDate);
          updateNotificationInput.paidDate = paidDate.toISOString();
          delete updateNotificationInput.createdDate;
        } 
  
        if(updateNotificationInput.nextDate) {
          const nextDate = new Date(updateNotificationInput.nextDate);
          updateNotificationInput.nextDate = nextDate.toISOString();
        } 

        if(!updateNotificationInput.nextDate) {
          delete updateNotificationInput.nextDate;
        }

        const {id, ...rest} = updateNotificationInput;
        
        const newEvent = await notificationService.update(id ,rest);
        return withSuccess(newEvent);
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteEvent: async (parent, args, context) => {
      try {
        const event = await eventService.delete(args.id);
        if(!!event)
          return withSuccess(event);
        else 
          throw new Error("Something went wrong");
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Event: {
    notifications: async (obj, args, context, info) => {
      try {
        const notifications = await notificationService.find({ eventId: obj.id })
        return notifications;
      } catch (error) {
        throw new Error(error);
      }
    }
  },
};

export default resolvers;
