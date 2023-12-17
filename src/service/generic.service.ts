import { IRepository } from '../repository/generic.repository';
import { GenericRepository } from "../repository/repository";

export class GenericService<T> {
    private genericRepository: IRepository<T>;
    
    constructor(genericRepository: IRepository<T>) {
      this.genericRepository = genericRepository;
    }
  
    async getAll(): Promise<T[]> {
      return await this.genericRepository.readAll();
    }
  
    async getById(id: number): Promise<T | undefined> {
      return await this.genericRepository.readOne(id);
    }
  
    async create(entity: T): Promise<boolean> {
      // const created = await this.genericRepository.create(entity);
      // return created;
      return true;
    }
  
    async update(entity: T): Promise<void> {
      // await this.genericRepository.update(entity.id!, entity);
    }
  
    async delete(id: number): Promise<void> {
      // await this.genericRepository.delete(id);
    }

    async find(entity: Partial<T>): Promise<T[]> {
      return await this.genericRepository.find(entity);
    }
}
