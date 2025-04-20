import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1744393150532 implements MigrationInterface {
    name = ' $npmConfigName1744393150532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airport" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "airport" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airport" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "airport" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airport" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "airport" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airport" DROP COLUMN "iataCode"`);
        await queryRunner.query(`ALTER TABLE "airport" ADD "iataCode" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airport" DROP COLUMN "iataCode"`);
        await queryRunner.query(`ALTER TABLE "airport" ADD "iataCode" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airport" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "airport" ADD "country" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airport" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "airport" ADD "city" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airport" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "airport" ADD "name" character varying(100) NOT NULL`);
    }

}
