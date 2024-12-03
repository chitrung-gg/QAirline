import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { extend } from "@hapi/joi";

@Injectable()
export class JwtAuthenticationGuard extends AuthGuard('jwt') {
    // canActivate(context: ExecutionContext) {
    //     // Add your custom authentication logic here
    //     // for example, call super.logIn(request) to establish a session.
    //     return super.canActivate(context);
    // }

    // handleRequest(err, user, info) {
    //     // You can throw an exception based on either "info" or "err" arguments
    //     if (err || !user) {
    //         console.log(err)
    //     }
    //     return user;
    // }
    handleRequest(...args: Parameters<InstanceType<ReturnType<typeof AuthGuard>>['handleRequest']>) {
        console.log(args);
        return super.handleRequest(...args);
    }
}