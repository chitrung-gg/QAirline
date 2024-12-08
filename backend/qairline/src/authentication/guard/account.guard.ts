import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AccountGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const noAccountGuard = this.reflector.getAllAndOverride<boolean>(
            process.env.NO_ACCOUNT_GUARD_KEY,
            [context.getHandler(), context.getClass()],
        );

        const isPublic = this.reflector.getAllAndOverride<boolean>(process.env.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic || noAccountGuard) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: User = request.user;

        if (user.status !== 'Active') {
            throw new UnauthorizedException(`Account ${user.status}`);
        }

        // NOTE
        return false
    }
}