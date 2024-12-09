import { Module } from '@nestjs/common';
import { AboutusService } from './aboutus.service';
import { AboutusController } from './aboutus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aboutus } from './entity/aboutus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aboutus])],
  controllers: [AboutusController],
  providers: [AboutusService],
})
export class AboutusModule {}
