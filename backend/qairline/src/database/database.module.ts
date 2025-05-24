import { Module } from "@nestjs/common";
// import { databaseProviders } from "./database.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Flight } from "src/flight/entity/flight.entity";

console.log('__dirname:', __dirname);
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB'),
                ssl: configService.get('POSTGRES_SSLMODE') == 'require' ? {
                    rejectUnauthorized: false
                } : false,         // Ignore when using localhost PostgreSQL
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
                autoLoadEntities: true
            })
            
        })
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class DatabaseModule {}