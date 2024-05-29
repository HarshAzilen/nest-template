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
import { SubscriptionStatus } from '../constants/subscription-status.enum';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { SocialMediaEntity } from 'src/modules/social-media/entities/social-media.entity';
import { SubscriptionEntity } from 'src/modules/subscription/entities/subscription.entity';

@Entity('location')
export class LocationEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string;

  @Expose()
  @Column({ name: 'name', type: 'varchar', nullable: false })
  name!: string;

  @Expose()
  @Column({ name: 'description', type: 'varchar', nullable: true })
  description!: string;

  @Expose()
  @Column({ name: 'sub_status', type: 'enum', enum: SubscriptionStatus, nullable: true })
  sub_status!: string;

  @Expose()
  @Column({ name: 'sub_start_date', nullable: true })
  sub_start_date: Date;

  @Expose()
  @Column({ name: 'sub_start_date', nullable: true })
  sub_end_date: Date;

  @Expose()
  @Column({ name: 'media', type: 'uuid', nullable: true })
  media!: string;

  @Expose()
  @Column({ name: 'venue_operator_id', type: 'uuid', nullable: false })
  venue_operator_id!: string;

  @Expose()
  @Column({ name: 'location_operator_id', type: 'uuid', nullable: false })
  location_operator_id!: string;

  @Expose()
  @Column({ name: 'subscription_id', type: 'uuid', nullable: true })
  subscription_id!: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'venue_operator_id', referencedColumnName: 'id' })
  venue_operator: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'location_operator_id', referencedColumnName: 'id' })
  location_operator: UserEntity;

  @ManyToOne(() => SubscriptionEntity)
  @JoinColumn({ name: 'subscription_id', referencedColumnName: 'id' })
  subscription: SubscriptionEntity;

  @OneToOne(() => SocialMediaEntity, { nullable: true })
  @JoinColumn()
  social_media: SocialMediaEntity;
}
