import { IRepository } from '../repository/generic.repository';
import { GenericRepository } from "../repository/repository";

export class GenericService<T> {
    private genericRepository: IRepository<T>;
    
    constructor(genericRepository: IRepository<T>) {
      this.genericRepository = genericRepository;
    }
  
    async getAll(): Promise<T[]> {
      const check =  await this.genericRepository.readAll();
      return check;
    }
  
    async getById(id: number): Promise<T | undefined> {
      return await this.genericRepository.readOne(id);
    }
  
    async create(entity: Partial<T>): Promise<T> {
      return await this.genericRepository.create(entity);
    }
  
    async update(id: number, entity: any): Promise<void> {
      await this.genericRepository.update(id, entity);
    }
  
    async delete(id: number): Promise<void> {
      // await this.genericRepository.delete(id);
    }

    async find(entity: Partial<T>): Promise<T[]> {
      return await this.genericRepository.find(entity);
    }
}
