import { IBaseDocument } from "../database";
import { GenericRepository } from "../repository/repository";

export class GenericService<T extends IBaseDocument> {
    constructor(private readonly genericRepository: GenericRepository<T>) {}
  
    async getAll(): Promise<T[]> {
      return await this.genericRepository.readAll();
    }
  
    async getById(id: number): Promise<T | undefined> {
      return await this.genericRepository.readOne(id);
    }
  
    async create(entity: T): Promise<boolean> {
      const created = await this.genericRepository.create(entity);
      return created;
    }
  
    async update(entity: T): Promise<void> {
      await this.genericRepository.update(entity.id!, entity);
    }
  
    async delete(id: number): Promise<void> {
      await this.genericRepository.delete(id);
    }

    async find(entity: Partial<T>): Promise<T[]> {
      return await this.genericRepository.find(entity);
    }
}
