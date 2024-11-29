import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732892020006 implements MigrationInterface {
    name = ' $npmConfigName1732892020006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."aircrafts_status_enum" AS ENUM('Active', 'Maintenance', 'Retired')`);
        await queryRunner.query(`CREATE TABLE "aircrafts" ("aircraftId" SERIAL NOT NULL, "aircraftCode" character varying(50) NOT NULL, "model" character varying(100) NOT NULL, "manufacturer" character varying(100) NOT NULL, "capacity" integer NOT NULL, "seatClasses" json NOT NULL, "status" "public"."aircrafts_status_enum" NOT NULL DEFAULT 'Active', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9ba571a7aaa62b6a787c16c6041" UNIQUE ("aircraftCode"), CONSTRAINT "PK_dfa8c358c9cb5256f7c807311c3" PRIMARY KEY ("aircraftId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "aircrafts"`);
        await queryRunner.query(`DROP TYPE "public"."aircrafts_status_enum"`);
    }

}
