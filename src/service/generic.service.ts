import { BaseRecord } from "../database";
import { GenericRepository } from "../repository/repository";

export class GenericService<T extends BaseRecord> {
    constructor(private readonly genericRepository: GenericRepository<T>) {}
  
    async getAll(): Promise<T[]> {
      return await this.genericRepository.readAll();
    }
  
    async getById(id: number): Promise<T | undefined> {
      return await this.genericRepository.readOne(id);
    }
  
    async create(user: T): Promise<void> {
      await this.genericRepository.create(user);
    }
  
    async update(user: T): Promise<void> {
      await this.genericRepository.update(user.id!, user);
    }
  
    async delete(id: number): Promise<void> {
      await this.genericRepository.delete(id);
    }
}
