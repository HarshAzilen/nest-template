import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  DeleteDateColumn,
} from 'typeorm';

import { EntityRelationalHelper } from '../../../utils/relational-entity-helper';

@Entity('user')
export class UserEntity extends EntityRelationalHelper {
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
  @Column()
  firstName!: string;

  @Expose()
  @Column()
  lastName!: string;

  @Expose()
  @Column({ unique: true })
  email!: string;

  @Expose()
  @Column({ unique: true })
  //
  user_role!: string;

  @Expose()
  @Column({ unique: true })
  phoneNo!: string;

  @Column()
  password!: string;

  @Expose()
  @Column({ unique: true })
  isVerified!: string;

  @Expose()
  @Column()
  otp!: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt!: Date;
}
