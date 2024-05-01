import { Repository } from 'typeorm';

export class CommonRepository<Entity> {
  repository: Repository<Entity>;
  constructor(repository: Repository<Entity>) {
    this.repository = repository;
  }
  async getData(): Promise<Entity[]> {
    return await this.repository.find();
  }
}
