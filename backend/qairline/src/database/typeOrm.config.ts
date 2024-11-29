import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as path from 'path';
import { Aircraft } from '../aircraft/entity/aircraft.entity';
import { Airline } from '../airline/entity/airline.entity';
import { Airport } from '../airport/entity/airport.entity';
import { Announcement } from '../announcement/entity/announcement.entity';
import { Booking } from '../booking/entity/booking.entity';
import { Flight } from '../flight/entity/flight.entity';
import { Introduction } from '../introduction/entity/introduction.entity';
import { News } from '../news/entity/news.entity';
import { Promotion } from '../promotion/entity/promotion.entity';
import { User } from '../user/entity/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [
        Aircraft,
        Airline,
        Airport,
        Announcement,
        Booking,
        Flight,
        Introduction,
        News,
        Promotion,
        Report,
        User,
    ],
    migrations: [__dirname + "/migration/*.ts"],
    synchronize: true,
});