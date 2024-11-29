import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732907621326 implements MigrationInterface {
    name = ' $npmConfigName1732907621326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."booking_booking_status_enum" AS ENUM('Purchased', 'Waiting', 'Cancelled')`);
        await queryRunner.query(`CREATE TABLE "booking" ("booking_id" SERIAL NOT NULL, "passenger_name" character varying(255) NOT NULL, "passenger_dob" date NOT NULL, "passport_number" character varying(50) NOT NULL, "ticket_code" character varying(50) NOT NULL, "ticket_price" numeric(10,2) NOT NULL, "seat_number" integer NOT NULL, "seat_class" character varying(50) NOT NULL, "booking_date" TIMESTAMP NOT NULL DEFAULT now(), "booking_status" "public"."booking_booking_status_enum" NOT NULL DEFAULT 'Waiting', "total_amount" numeric(10,2) NOT NULL, "promo_code" character varying(50), "payment_date" TIMESTAMP, "userId" integer NOT NULL, "flightId" integer NOT NULL, CONSTRAINT "PK_9ecc24640e39cd493c318a117f1" PRIMARY KEY ("booking_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."announcement_type_enum" AS ENUM('News', 'Promo', 'Alert')`);
        await queryRunner.query(`CREATE TABLE "announcement" ("announcement_id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" text NOT NULL, "type" "public"."announcement_type_enum" NOT NULL DEFAULT 'News', "is_active" boolean NOT NULL DEFAULT true, "start_date" TIMESTAMP, "end_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_017bde9e7611c5a6151ac081f6c" PRIMARY KEY ("announcement_id"))`);
        await queryRunner.query(`ALTER TABLE "aircrafts" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."aircrafts_status_enum"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "airline"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "departureAirport"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "arrivalAirport"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flight" ADD "airlineName" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flight" ADD "maxSeats" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flight" ADD "price" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flight" ADD "flightType" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flight" ADD "duration" double precision`);
        await queryRunner.query(`ALTER TABLE "flight" ADD "aircraft_id" integer`);
        await queryRunner.query(`ALTER TABLE "flight" ADD "departure_airport_id" integer`);
        await queryRunner.query(`ALTER TABLE "flight" ADD "arrival_airport_id" integer`);
        await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "UQ_f3e21c00ba40ed321afed8dc1e1" UNIQUE ("flightNumber")`);
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "flight" ADD "status" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "FK_0c827c0f3e1a515e1a3c77eb0f3" FOREIGN KEY ("aircraft_id") REFERENCES "aircrafts"("aircraftId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "FK_d4e99e5076aad50e7b8cf855082" FOREIGN KEY ("departure_airport_id") REFERENCES "airport"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "FK_60943d346e3a9dbdc7607b32afe" FOREIGN KEY ("arrival_airport_id") REFERENCES "airport"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_cc8ec8fa07ca411f70625d36f87" FOREIGN KEY ("flightId") REFERENCES "flight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_cc8ec8fa07ca411f70625d36f87"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "FK_60943d346e3a9dbdc7607b32afe"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "FK_d4e99e5076aad50e7b8cf855082"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "FK_0c827c0f3e1a515e1a3c77eb0f3"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "flight" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "UQ_f3e21c00ba40ed321afed8dc1e1"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "arrival_airport_id"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "departure_airport_id"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "aircraft_id"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "flightType"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "maxSeats"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "airlineName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "flight" ADD "arrivalAirport" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flight" ADD "departureAirport" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flight" ADD "airline" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."aircrafts_status_enum" AS ENUM('Active', 'Maintenance', 'Retired')`);
        await queryRunner.query(`ALTER TABLE "aircrafts" ADD "status" "public"."aircrafts_status_enum" NOT NULL DEFAULT 'Active'`);
        await queryRunner.query(`DROP TABLE "announcement"`);
        await queryRunner.query(`DROP TYPE "public"."announcement_type_enum"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TYPE "public"."booking_booking_status_enum"`);
    }

}
