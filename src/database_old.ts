interface IUser {
  id:string;
  displayName:string;
  role:string;
  password:string;
}

interface IEvent {
  id: string;
  userId: string;
  name: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
}

interface INotification {
  id: string;
  createdAt: string;
  isCompleted: boolean;
  details: string;
  eventid: string;
}

interface BaseRecord{
  id: string
}

export interface IDatabase<T extends BaseRecord> {
  set(newValue: T): void;
  get(id: string): T | undefined;
  getAll(): T[];
  delete(id: string): boolean;
} 


class Database<T extends BaseRecord> implements IDatabase<T> {
  private state: Record<string, T> = {}

  set(newValue: T): void {
    this.state[newValue.id] = newValue;
  }

  get(id: string): T | undefined {
    return this.state[id];
  }
  
  getAll(): T[] {
    throw new Error("Method not implemented.");
  }
  
  delete(id: string): boolean {
    if(this.state[id]) {
      delete this.state[id];
      return true;
    }
      return false;
  }
}

const userDatabase = new Database<IUser>();
const eventDatabase = new Database<IEvent>();
const notificationDatabase = new Database<INotification>();

export default {
  userDB: userDatabase,
  eventDB: eventDatabase,
  notificationDB: notificationDatabase
};
