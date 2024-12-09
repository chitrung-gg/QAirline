import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Request, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthenticationGuard } from "src/authentication/guard/jwtAuthentication.guard";
import { CreateUserDto } from "./dto/createUser.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";
import RequestWithUser from "src/authentication/interface/requestWithUser.interface";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
@UseInterceptors(CacheInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Return all users.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async getAll(){
        return this.userService.getAllUsers();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody({ type: () => CreateUserDto })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
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
    @ApiOperation({ summary: 'Generate email verification' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Email verification generated successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async generateEmailVerification(@Request() req: RequestWithUser) {
        await this.userService.generateEmailVerification(req.user.id)

        return { status: 'success', message: 'Sending email in a moment' };
    }

    @SetMetadata(process.env.NO_ACCOUNT_GUARD_KEY, true)
    @UseGuards(JwtAuthenticationGuard)
    @Post('verify/:otp')
    @ApiOperation({ summary: 'Verify email with OTP' })
    @ApiParam({ name: 'otp', description: 'One-time password for email verification', example: '123456' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Email verified successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async verifyEmail(@Param('otp') otp: string, @Req() req: RequestWithUser) {
        const result = await this.userService.verifyEmail(req.user.id, otp)

        return { status: result ? 'success' : 'failure', message: null };
    }
}