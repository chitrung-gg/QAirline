import { Module } from "@nestjs/common";
import { AircraftController } from "./aircraft.controller";
import { AircraftService } from "./aircraft.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Aircraft } from "./entity/aircraft.entity";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
    imports: [TypeOrmModule.forFeature([Aircraft])],
    controllers: [AircraftController],
    providers: [AircraftService],
    exports: [AircraftService]
})
export class AircraftModule {}