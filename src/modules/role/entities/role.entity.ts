import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../utils/relational-entity-helper';
import { Expose } from 'class-transformer';
import { UserEntity } from '../../../modules/user/entities/user.entity';

@Entity('roles')
export class RoleEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string;

  @Expose()
  @Column({ name: 'role', type: 'varchar', nullable: true })
  role!: string;

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

  @OneToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
