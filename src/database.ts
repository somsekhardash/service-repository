import { PrismaClient } from "@prisma/client";

export class Database {
  private static _instance: Database = new Database();
  private client = new PrismaClient();

  constructor() {
    if (Database._instance) {
      throw new Error(
        "Error: Instantiation failed: Use Database.getInstance() instead of new."
      );
    }
  }

  static getInstance(): Database {
    return Database._instance;
  }

  public getClient() {
    this.client;
  }
}

const database = Database.getInstance();
const client = database.getClient();
// // console.log("I am heree");
// // console.log(client);
// // const prisma = new PrismaClient();

export default {
  client
};


export interface IBaseDocument {
  id?: any;
  createdAt?: any;
  updatedAt?: any;
}

export interface IUserDocument extends IBaseDocument {
  role: string;
  password: string;
  mobileNumber: number;
  username: string;
}

export interface IEventDocument extends IBaseDocument {
  userId?: number | string;
  name?: string;
  description?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  frequency?: eventsType;
}

export interface INotificationDocument extends IBaseDocument {
  amount: number;
  details: string;
  createdDate: string;
  nextDate: string;
  isCompleted: boolean;
  title: string;
  eventId: string;
}

export enum eventsType {
  CUSTOM = "CUSTOM",
  MONTH = "MONTH",
  DAY = "DAY",
  WEEK = "WEEK",
  YEAR = "YEAR"
}
