import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Request, SetMetadata, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthenticationGuard } from "src/authentication/guard/jwtAuthentication.guard";
import { CreateUserDto } from "./dto/createUser.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";
import RequestWithUser from "src/authentication/interface/requestWithUser.interface";
@Controller('user')
@UseInterceptors(CacheInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    async getAll(){
        return this.userService.getAllUsers();
    }

    
    @Post()
    async createUser(@Body() createUser: CreateUserDto) {
        const user = await this.userService.createUser(createUser)
        if (user) {
            return user
        }
        throw new HttpException('Cannot create user', HttpStatus.BAD_REQUEST)
    }

    @SetMetadata(process.env.NO_ACCOUNT_GUARD_KEY, true)
    @UseGuards(JwtAuthenticationGuard)
    @Post('verification')
    async generateEmailVerification(@Request() req: RequestWithUser) {
        await this.userService.generateEmailVerification(req.user.id)

        return { status: 'success', message: 'Sending email in a moment' };
    }

    @SetMetadata(process.env.NO_ACCOUNT_GUARD_KEY, true)
    @UseGuards(JwtAuthenticationGuard)
    @Post('verify/:otp')
    async verifyEmail(@Param('otp') otp: string, @Req() req: RequestWithUser) {
        const result = await this.userService.verifyEmail(req.user.id, otp)

        return { status: result ? 'sucess' : 'failure', message: null };
    }
}