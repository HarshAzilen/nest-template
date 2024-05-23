import { CommonRepository } from './common.repository';

class CommonService<Entity> {
  repository: CommonRepository<Entity>;

  constructor(repository: CommonRepository<Entity>) {
    this.repository = repository;
  }

  async getData(): Promise<Entity[]> {
    return await this.repository.getData();
  }
}
export { CommonService };
