import { Repository } from 'typeorm';
import { CommonRepository } from './common.repository';

class CommonService<Entity> {
  repository: CommonRepository<Entity>;

  constructor(repository: Repository<Entity>) {
    this.repository = new CommonRepository(repository);
  }

  async getData(): Promise<Entity[]> {
    return await this.repository.getData();
  }
}
export { CommonService };
