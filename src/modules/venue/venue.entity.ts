import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  DeleteDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../utils/relational-entity-helper';
import { UserEntity } from '../user/entities/user.entity';

@Entity('venues')
export class VenueEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string;

  @Expose()
  @Column({ name: 'name', type: 'varchar', nullable: false })
  name!: string;

  @Expose()
  @Column({ name: 'description', type: 'varchar', nullable: false })
  description!: string;

  @Expose()
  @Column({ name: 'location', type: 'varchar', nullable: false })
  location!: string;

  @Expose()
  @Column({ name: 'venue_operator_id', type: 'varchar', nullable: false })
  venueOperatorId!: string;

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

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'venue_operator_id', referencedColumnName: 'id' })
  venueOperator: UserEntity;
}
