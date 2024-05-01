import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';

import { PostEntity } from '../../post/entities/post.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Expose()
  @Index()
  @Column({ type: 'uuid' })
  uuid!: string;

  @Expose()
  @Column()
  name!: string;

  @Expose()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Expose()
  @OneToMany(() => PostEntity, (post) => post.user)
  posts!: PostEntity[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;
}
