import { Expose } from 'class-transformer';
import { EntityRelationalHelper } from '../../../utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { SocialMediaEntity } from 'src/modules/social-media/entities/social-media.entity';

@Entity('venue')
export class VenueEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string;

  @Expose()
  @Column({ name: 'name', type: 'varchar', nullable: false })
  name!: string;

  @Expose()
  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;

  @Expose()
  @Column({ name: 'location', type: 'varchar', nullable: true })
  location!: string;

  @Expose()
  @Column({ name: 'media', type: 'uuid', nullable: true })
  media!: string;

  @Expose()
  @Column({ name: 'venue_operator_id', type: 'uuid', nullable: false })
  venue_operator_id!: string;

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

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'venue_operator_id', referencedColumnName: 'id' })
  venue_operator: UserEntity;

  @OneToOne(() => SocialMediaEntity, { nullable: true })
  @JoinColumn()
  social_media: SocialMediaEntity;
}
