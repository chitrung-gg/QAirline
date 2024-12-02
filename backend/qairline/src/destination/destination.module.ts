import { Module } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { Destination } from './entity/destination.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Destination])],
  controllers: [DestinationController],
  providers: [DestinationService],
})
export class DestinationModule {}
