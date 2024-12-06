import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1733500161413 implements MigrationInterface {
    name = ' $npmConfigName1733500161413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flight" ADD "baseClassPrice" jsonb NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "baseClassPrice"`);
    }

}
