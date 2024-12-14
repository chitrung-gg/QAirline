
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { AuthenticationController } from './authentication.controller';
import { JwtStrategy } from './passport/jwt.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtRefreshTokenStrategy } from './passport/jwtRefresh.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    // JwtModule.registerAsync({
    //   global: true,
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get('JWT_SECRET'),
    //     signOptions: {
    //       expiresIn: configService.get('JWT_EXPIRATION_TIME'),
    //     },
    //   }),
    // })
    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' },
    // }),
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthenticationController],
  exports: [AuthenticationService]
})
export class AuthenticationModule {}