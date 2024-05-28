import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1716461669758 implements MigrationInterface {
  name = 'Migrations1716461669758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_b36bcfe02fc8de3c57a8b2391c2" DEFAULT 'NEWID()', "role" varchar(255), "created_at" datetime2 NOT NULL CONSTRAINT "DF_3e267a94bab0461665be604cb16" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_df1c1728197f53438461be18c2e" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_b36bcfe02fc8de3c57a8b2391c" ON "role" ("id") `);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_cace4a159ff9f2512dd42373760" DEFAULT 'NEWID()', "first_name" varchar(255), "last_name" varchar(255), "email" varchar(255), "password" varchar(255), "phone_no" int, "role_id" uniqueidentifier, "added_by" uniqueidentifier, "refresh_token" varchar(255), "otp" varchar(255), "otp_expire" datetime, "created_at" datetime2 NOT NULL CONSTRAINT "DF_d091f1d36f18bbece2a9eabc6e0" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_9cdce43fa0043c794281aa09051" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_638bac731294171648258260ff2" UNIQUE ("password"), CONSTRAINT "UQ_4c3d272c877fae52038d9bd3201" UNIQUE ("phone_no"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_cace4a159ff9f2512dd4237376" ON "user" ("id") `);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
    await queryRunner.query(`DROP INDEX "IDX_cace4a159ff9f2512dd4237376" ON "user"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP INDEX "IDX_b36bcfe02fc8de3c57a8b2391c" ON "role"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
