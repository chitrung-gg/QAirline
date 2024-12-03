import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor (
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // You can set this to true if you want to allow expired tokens
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
            // usernameField: ['email', 'id', 'password']
        })
    }

    async validate(payload: any) {
        // console.log(payload)
        return { userId: payload.id, username: payload.username}
    }
}