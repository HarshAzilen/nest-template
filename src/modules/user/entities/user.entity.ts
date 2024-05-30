import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from '../../../modules/role/entities/role.entity';
import { EntityRelationalHelper } from '../../../utils/relational-entity-helper';

@Entity('user')
export class UserEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string;

  @Expose()
  @Column({ name: 'first_name', type: 'varchar', nullable: true })
  firstName!: string;

  @Expose()
  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  lastName!: string;

  @Expose()
  @Column({ name: 'email', unique: true, type: 'varchar', nullable: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: true })
  password!: string;

  @Expose()
  @Column({ name: 'phone_no', type: 'varchar', nullable: true })
  phoneNo!: string;

  @Expose()
  @Column({ name: 'role_id', type: 'uuid', nullable: true })
  roleId!: string;

  @Expose()
  @Column({ name: 'is_verified', type: 'bit', default: false })
  isVerified!: boolean;

  @Expose()
  @Column({ name: 'added_by', type: 'uuid', nullable: true })
  addedBy!: string;

  @Expose()
  @Column({ name: 'refresh_token', type: 'varchar', nullable: true })
  refreshToken!: string;

  @Expose()
  @Column({ name: 'otp', type: 'varchar', nullable: true })
  otp!: string;

  @Expose()
  @Column({ name: 'otp_expire', nullable: true })
  otp_expire: Date;

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

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  roles: RoleEntity;
}
