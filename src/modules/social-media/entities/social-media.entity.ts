import { Expose } from 'class-transformer';
import { EntityRelationalHelper } from '../../../utils/relational-entity-helper';
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

@Entity('social_media')
export class SocialMediaEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string;

  @Expose()
  @Column({ name: 'facebook', type: 'varchar', nullable: true })
  facebook!: string;

  @Expose()
  @Column({ name: 'website', type: 'varchar', nullable: true })
  website!: string;

  @Expose()
  @Column({ name: 'other', type: 'varchar', nullable: true })
  other: string;

  @Expose()
  @Column({ name: 'instagram', type: 'varchar', nullable: true })
  instagram!: string;

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
