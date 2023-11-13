// @ts-nocheck
import fs from 'fs';

export interface IBaseDocument {
  id?: number;
  createdAt?: any;
  updatedAt?: any;
}

export interface IUserDocument extends IBaseDocument {
  displayName: string;
  role: string;
  password: string;
  mobileNumber: number;
  username: string;
}

export interface IEventDocument extends IBaseDocument {
  userId: number;
  name: string;
  description: string;
  type: string;
  startDate: string;
  endDate?: string;
  frequency: eventsType;
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

export interface IDatabase<T> {
  create(newValue: T): T;
  get(id: number): T | undefined;
  getAll(): T[];
  delete(id: number): boolean;
  find(newValue: T): T[];
}

const compare = r => l => (typeof l === "object" ? contains(r)(l) : l === r);
const contains = r => l =>
  Object.keys(r).every(k => l.hasOwnProperty(k) && compare(r[k])(l[k]));

export class Database<T extends IBaseDocument> implements IDatabase<T> {
  private state: T[] = [];

  private proxy = new Proxy(this.state, {
    deleteProperty: function(target, property) {
      delete target[property];
      console.log("Deleted %s", property);
      return true;
    },
    set: function(target, property, value, receiver) {      
      target[property] = value;
      console.log("Set %s to %o", property, value);
      return true;
    }
  });

  constructor(path: string) {
    const data =  JSON.parse(fs.readFileSync(path, 'utf8'));
    this.proxy = data;
  }

  create(newValue: T): T {
    if (!newValue) {
      throw new Error("Missing Data");
    }
    const createdEntity= {
      id: this.proxy.length + 1,
      ...newValue,
    };
    this.proxy.push(createdEntity);
    return createdEntity;
  }

  update(id: number, newValue: T): T {
    if (!newValue) {
      throw new Error("Missing Data");
    }
    var foundIndex = this.proxy.findIndex(x => x.id == id);
    this.proxy[foundIndex] = newValue;
    return newValue;
  }

  find(item: Partial<T>): T[] {
    if (!item) {
      throw new Error("Missing Data");
    }
    var item = this.proxy.filter(contains(item));
    return item;
  }

  get(id: number): T | undefined {
    if (!id) {
      throw new Error("Missing Data");
    }
    return this.proxy.find((entity) => entity.id === id);
  }

  getAll(): T[] {
    return this.proxy;
  }

  delete(id: number): boolean {
    if (!id) {
      return false;
    }
    this.proxy = this.proxy.filter((item) => item.id != id);
    return true;
  }

  clear(): boolean {
    this.proxy = [];
    return true
  }
}


const userDatabase = new Database<IUserDocument>(`${__dirname}/data/users.json`);
const eventDatabase = new Database<IEventDocument>(`${__dirname}/data/events.json`);
const notificationDatabase = new Database<INotificationDocument>(`${__dirname}/data/notifications.json`);

eventDatabase.create({
  userId: 1,
  name: "name1",
  description: "description1",
  type: "type1",
  startDate: "startDate1",
  endDate: "endDate1",
  frequency: eventsType.MONTH
});

eventDatabase.create({
  userId: 2,
  name: "name2",
  description: "description2",
  type: "type2",
  startDate: "startDate2",
  endDate: "endDate2",
  frequency: eventsType.WEEK
});

notificationDatabase.create({
  amount: 100,
  details: "Eletric Bill Berhampur",
  createdDate: "Dec 2020",
  nextDate: "Jan 2021",
  isCompleted: true,
  title: "Elec Berhapur",
  eventId: 1
});

userDatabase.create({ 
  displayName: 'Admin User', 
  email: 'john.doe@example.com', 
  role: 'admin' 
});

userDatabase.create({ 
  displayName: 'Just User', 
  email: 'Just.Just@example.com', 
  role: 'user' 
});

export default {
  userDB: userDatabase,
  eventDB: eventDatabase,
  notificationDB: notificationDatabase,
};
