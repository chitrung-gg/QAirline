import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [TypeOrmModule.forFeature([User]), ConfigModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {

}