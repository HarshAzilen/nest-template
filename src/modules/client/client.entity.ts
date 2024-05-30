import { Expose } from 'class-transformer';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../utils/relational-entity-helper';

@Entity('client')
export class ClientEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string;

  @Expose()
  @Column({ name: 'client_id', unique: true, type: 'varchar', nullable: true })
  clientId!: string;

  @Expose()
  @Column({ name: 'secret', type: 'varchar', nullable: true })
  secret!: string;

  @Expose()
  @Column({ name: 'redirect_url', type: 'varchar', nullable: true })
  redirectUrl!: string;

  @Expose()
  @Column({ name: 'email', unique: true, type: 'varchar', nullable: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: true })
  password!: string;

  @Expose()
  @Column({ name: 'access_token', unique: true, type: 'varchar', nullable: true })
  AccessToken: string;

  @Expose()
  @Column({ name: 'refresh_token', unique: true, type: 'varchar', nullable: true })
  refreshToken: string;

  @Column({ name: 'created_at', type: 'varchar', nullable: true })
  createdAt!: string;

  @Expose()
  @Column({ name: 'updated_at', type: 'int', nullable: true })
  updatedAt!: number;

  @Expose()
  @Column({ name: 'deleted_at', type: 'uuid', nullable: true })
  deletedAt!: string;
}
