import { MigrationInterface, QueryRunner } from 'typeorm';

export class SubscriberRefactoring1574699407934 implements MigrationInterface {
  name = 'SubscriberRefactoring1574699407934';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TYPE "subscriber_access_accesspermissions_enum" AS ENUM('READ', 'WRITE', 'ADMIN')`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriber_access" ADD "accessPermissions" "subscriber_access_accesspermissions_enum" array NOT NULL DEFAULT ('{READ, WRITE, ADMIN}')`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "subscriber_access" DROP COLUMN "accessPermissions"`,
      undefined,
    );
    await queryRunner.query(
      `DROP TYPE "subscriber_access_accesspermissions_enum"`,
      undefined,
    );
  }
}
