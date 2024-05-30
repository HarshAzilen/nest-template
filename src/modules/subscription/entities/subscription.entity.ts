import { Expose } from 'class-transformer';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('subscription')
export class SubscriptionEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string;

  @Expose()
  @Column({ name: 'name', type: 'varchar', nullable: false })
  name!: string;

  @Expose()
  @Column({ name: 'amount', type: 'varchar', nullable: false })
  amount!: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;
}
