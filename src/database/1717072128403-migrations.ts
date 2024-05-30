import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717072128403 implements MigrationInterface {
    name = 'Migrations1717072128403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_b36bcfe02fc8de3c57a8b2391c2" DEFAULT NEWSEQUENTIALID(), "role" varchar(255), "created_at" datetime2 NOT NULL CONSTRAINT "DF_3e267a94bab0461665be604cb16" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_df1c1728197f53438461be18c2e" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b36bcfe02fc8de3c57a8b2391c" ON "role" ("id") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_cace4a159ff9f2512dd42373760" DEFAULT NEWSEQUENTIALID(), "first_name" varchar(255), "last_name" varchar(255), "email" varchar(255), "password" varchar(255), "phone_no" int, "role_id" uniqueidentifier, "added_by" uniqueidentifier, "refresh_token" varchar(255), "otp" varchar(255), "otp_expire" datetime, "created_at" datetime2 NOT NULL CONSTRAINT "DF_d091f1d36f18bbece2a9eabc6e0" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_9cdce43fa0043c794281aa09051" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_638bac731294171648258260ff2" UNIQUE ("password"), CONSTRAINT "UQ_4c3d272c877fae52038d9bd3201" UNIQUE ("phone_no"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cace4a159ff9f2512dd4237376" ON "user" ("id") `);
        await queryRunner.query(`CREATE TABLE "client" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_96da49381769303a6515a8785c7" DEFAULT NEWSEQUENTIALID(), "client_id" varchar(255), "secret" varchar(255), "redirect_url" varchar(255), "email" varchar(255), "password" varchar(255), "access_token" varchar(255), "refresh_token" varchar(255), "created_at" varchar(255), "updated_at" int, "deleted_at" uniqueidentifier, CONSTRAINT "UQ_7510ce0a84bde51dbff978b4b49" UNIQUE ("client_id"), CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "UQ_7cb1ac6077fb59c239739116c54" UNIQUE ("access_token"), CONSTRAINT "UQ_33a0be3013ecc4c7dd148023ec4" UNIQUE ("refresh_token"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_96da49381769303a6515a8785c" ON "client" ("id") `);
        await queryRunner.query(`CREATE TABLE "social_media" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_54ac0fd97432069e7c9ab567f8b" DEFAULT NEWSEQUENTIALID(), "facebook" varchar(255), "website" varchar(255), "other" varchar(255), "instagram" varchar(255), "created_at" datetime2 NOT NULL CONSTRAINT "DF_792562a3e553cadeb2f651e4b53" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_0cc1a45d22c9dc17ed8a1b7c497" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "PK_54ac0fd97432069e7c9ab567f8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_54ac0fd97432069e7c9ab567f8" ON "social_media" ("id") `);
        await queryRunner.query(`CREATE TABLE "venue" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_c53deb6d1bcb088f9d459e7dbc0" DEFAULT NEWSEQUENTIALID(), "name" varchar(255) NOT NULL, "description" varchar(255), "location" varchar(255), "media" uniqueidentifier, "venue_operator_id" uniqueidentifier NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_0c89b51ce6d5c23ad484a242547" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_265ff93485fab0955a786b5ad3d" DEFAULT getdate(), "deleted_at" datetime2, "socialMediaId" uniqueidentifier, CONSTRAINT "PK_c53deb6d1bcb088f9d459e7dbc0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c53deb6d1bcb088f9d459e7dbc" ON "venue" ("id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_5c6155785af9aaa161dc67a0ff" ON "venue" ("socialMediaId") WHERE "socialMediaId" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_8c3e00ebd02103caa1174cd5d9d" DEFAULT NEWSEQUENTIALID(), "name" varchar(255) NOT NULL, "amount" varchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_9a97c3ebf1bef5345852963e4ce" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_91bb2de5bde9e365d7985d2e4d9" DEFAULT getdate(), CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8c3e00ebd02103caa1174cd5d9" ON "subscription" ("id") `);
        await queryRunner.query(`CREATE TABLE "location" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_876d7bdba03c72251ec4c2dc827" DEFAULT NEWSEQUENTIALID(), "name" varchar(255) NOT NULL, "description" varchar(255), "sub_status" varchar(50), "sub_start_date" datetime, "sub_end_date" datetime, "media_id" uniqueidentifier, "venue_operator_id" uniqueidentifier NOT NULL, "location_operator_id" uniqueidentifier NOT NULL, "subscription_id" uniqueidentifier, "created_at" datetime2 NOT NULL CONSTRAINT "DF_86a84a03aa0b5b18816456b2470" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_e93bd1e03cdadffd4d99e975ba7" DEFAULT getdate(), "socialMediaId" uniqueidentifier, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_876d7bdba03c72251ec4c2dc82" ON "location" ("id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_fface7963d8cd35db2c4b9225c" ON "location" ("socialMediaId") WHERE "socialMediaId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venue" ADD CONSTRAINT "FK_2df25ead93b9d932c53f98c90cc" FOREIGN KEY ("venue_operator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venue" ADD CONSTRAINT "FK_5c6155785af9aaa161dc67a0ff4" FOREIGN KEY ("socialMediaId") REFERENCES "social_media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_aeaed18959b839002c27d4bc545" FOREIGN KEY ("venue_operator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_39d7045945ff8e1f0b9d59a2ca9" FOREIGN KEY ("location_operator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_c80b5a131b2c66213007d38b308" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_fface7963d8cd35db2c4b9225cd" FOREIGN KEY ("socialMediaId") REFERENCES "social_media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_fface7963d8cd35db2c4b9225cd"`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_c80b5a131b2c66213007d38b308"`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_39d7045945ff8e1f0b9d59a2ca9"`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_aeaed18959b839002c27d4bc545"`);
        await queryRunner.query(`ALTER TABLE "venue" DROP CONSTRAINT "FK_5c6155785af9aaa161dc67a0ff4"`);
        await queryRunner.query(`ALTER TABLE "venue" DROP CONSTRAINT "FK_2df25ead93b9d932c53f98c90cc"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`DROP INDEX "REL_fface7963d8cd35db2c4b9225c" ON "location"`);
        await queryRunner.query(`DROP INDEX "IDX_876d7bdba03c72251ec4c2dc82" ON "location"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP INDEX "IDX_8c3e00ebd02103caa1174cd5d9" ON "subscription"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
        await queryRunner.query(`DROP INDEX "REL_5c6155785af9aaa161dc67a0ff" ON "venue"`);
        await queryRunner.query(`DROP INDEX "IDX_c53deb6d1bcb088f9d459e7dbc" ON "venue"`);
        await queryRunner.query(`DROP TABLE "venue"`);
        await queryRunner.query(`DROP INDEX "IDX_54ac0fd97432069e7c9ab567f8" ON "social_media"`);
        await queryRunner.query(`DROP TABLE "social_media"`);
        await queryRunner.query(`DROP INDEX "IDX_96da49381769303a6515a8785c" ON "client"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP INDEX "IDX_cace4a159ff9f2512dd4237376" ON "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "IDX_b36bcfe02fc8de3c57a8b2391c" ON "role"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
