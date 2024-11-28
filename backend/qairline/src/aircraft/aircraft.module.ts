import { Module } from "@nestjs/common";
import { AircraftController } from "./aircraft.controller";
import { AircraftService } from "./aircraft.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Aircraft } from "./entity/aircraft.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Aircraft])],
    controllers: [AircraftController],
    providers: [AircraftService],
})
export class AircraftModule {}