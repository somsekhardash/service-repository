// @ts-nocheck

export interface BaseRecord {
  id?: number;
}

export interface IUser extends BaseRecord {
  displayName: string;
  role: string;
  password: string;
}

export interface IEvent extends BaseRecord{
  userId: string;
  name: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
}

export interface INotification extends BaseRecord {
  createdAt: string;
  isCompleted: boolean;
  details: string;
  eventid: string;
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

export class Database<T extends BaseRecord> implements IDatabase<T> {
  private state: T[] = [];

  create(newValue: T): T {
    if (!newValue) {
      throw new Error("Missing Data");
    }
    const createdEntity= {
      id: this.state.length + 1,
      ...newValue,
    };
    this.state.push(createdEntity);
    return createdEntity;
  }

  update(id: number, newValue: T): T {
    if (!newValue) {
      throw new Error("Missing Data");
    }
    var foundIndex = this.state.findIndex(x => x.id == id);
    this.state[foundIndex] = newValue;
    return newValue;
  }

  find(item: T): T {
    if (!item) {
      throw new Error("Missing Data");
    }
    var item = this.state.filter(contains(item));
    return item;
  }

  get(id: number): T | undefined {
    if (!id) {
      throw new Error("Missing Data");
    }
    return this.state.find((entity) => entity.id === id);
  }

  getAll(): T[] {
    return this.state;
  }

  delete(id: number): boolean {
    if (!id) {
      return false;
    }
    this.state = this.state.filter((item) => item.id != id);
    return true;
  }

  clear(): boolean {
    this.state = [];
    return true
  }
}

const userDatabase = new Database<IUser>();
const eventDatabase = new Database<IEvent>();
const notificationDatabase = new Database<INotification>();

export default {
  userDB: userDatabase,
  eventDB: eventDatabase,
  notificationDB: notificationDatabase,
};
