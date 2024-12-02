import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor (
        private configService: ConfigService,
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication
            }]), secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate(payload: TokenPayload) {
        console.log(payload)
        return this.userService.getUserById(payload.userId)
    }
}