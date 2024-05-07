import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

import { UserEntity } from '../../user/entities/user.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';

@Entity('post')
export class PostEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ type: 'uuid' })
  @Expose()
  uuid!: string;

  @Column()
  @Expose()
  title!: string;

  @Column()
  @Expose()
  content!: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Expose()
  user!: UserEntity;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;
}
