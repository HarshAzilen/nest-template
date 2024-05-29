import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../utils/relational-entity-helper';
import { RoleEntity } from '../../../modules/role/entities/role.entity';
import { VenueEntity } from '../../venue/venue.entity';

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

  @Column({ name: 'password', unique: true, type: 'varchar', nullable: true })
  password!: string;

  @Expose()
  @Column({ name: 'phone_no', unique: true, type: 'int', nullable: true })
  phoneNo!: number;

  @Expose()
  @Column({ name: 'role_id', type: 'uuid', nullable: true })
  roleId!: string;

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
  role: RoleEntity;

  @OneToOne(() => VenueEntity, (venue) => venue.venueOperator)
  venue: VenueEntity;
}
