import { BaseRecord, Database } from "../database";
import { IRead, IWrite } from "./interfaces/type";

export class GenericRepository<T extends BaseRecord>
  implements IWrite<T>, IRead<T>
{
  constructor(readonly database: Database<T>) {}

  async read(item: T): Promise<T[]> {
    try {
      return (await this.database.find(item)) as unknown as T[];
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  async create(entity: T): Promise<boolean> {
    try {
      await this.database.create(entity);
      return true;
    } catch (error) {
      return false;
    }
  }

  async readOne(id: number): Promise<T> {
    try {
      return (await this.database.get(id)) as T;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, entity: T): Promise<boolean> {
    try {
      await this.database.update(id, entity);
      return true;
    } catch (error) {
      return false;
    }
  }

  async delete(id: number): Promise<boolean> {
    return await this.database.delete(id);
  }

  async readAll(): Promise<T[]> {
    return await this.database.getAll();
  }
}
