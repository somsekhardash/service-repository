import { Prisma, PrismaClient } from "@prisma/client";

export type ModelType = keyof PrismaClient;

export interface IRepository<T> {
  readOne(id: number): Promise<T | null>;
  readAll(): Promise<T[]>;
  create(data: any): Promise<T>;
  update(id: number, data: any): Promise<T>;
  delete(id: number): Promise<T>;
  find(data: Partial<T>): Promise<T[]>;
}

export class GenericRepository<T> implements IRepository<T> {
  protected model: any;
  constructor(modalName: Prisma.ModelName) {
    // const client = new PrismaClient();
    const client = new PrismaClient().$extends({
      result: {
        notification: {
          paidDateMonth: {
            needs: { paidDate: true },
            compute(notification) {
              return notification ? notification.paidDate.getMonth() + 1 : null
            },
          },
          paidDateYear: {
            needs: { paidDate: true },
            compute(notification) {
              return notification ? notification.paidDate.getFullYear() : null
            },
          }
        },
      },
    });
    this.model = client[modalName];
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      return await this.model.create({ data });
    } catch (error) {
      throw error;
    }
  }

  async readOne(id: number): Promise<T> {
    try {
      return await this.model.findUnique({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number|string, entity: Partial<T>): Promise<T> {
    try {
      return await this.model.update({ where: { id }, data: entity });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<T> {
    try {
      return await this.model.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async readAll(): Promise<T[]> {
    try {
      return await this.model.findMany();
    } catch (error) {
      throw error;
    }
  }

  async find(data: Partial<T>): Promise<T[]> {
    try {
      return await this.model.findMany({ where: data });
    } catch (error) {
      throw error;
    }
  }
}
