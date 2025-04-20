import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get, HttpException, HttpStatus, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import RequestWithUser from './interface/requestWithUser.interface';
import { LocalAuthenticationGuard } from './guard/localAuthentication.guard';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthenticationGuard } from './guard/jwtAuthentication.guard';
import { User } from 'src/user/entity/user.entity';
import { SignUpDto } from './dto/signUp.dto';
import { LogInDto } from './dto/logIn.dto';
import JwtRefreshGuard from './guard/jwtRefresh.guard';
import { RefreshToken } from './entity/token.entity';
import { JwtRefreshTokenStrategy } from './passport/jwtRefresh.strategy';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('authentication')
// @UseInterceptors(CacheInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}
    
    @UseGuards(JwtAuthenticationGuard)
    @HttpCode(200)
    @Post()
    @ApiOperation({ summary: 'Authenticate user' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User authenticated successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    authenticate(@Req() req: RequestWithUser) {
        const token = req.headers['authorization']?.split(' ')[1];
        return this.authenticationService.decodeToken(token)
    }

    @Post('signup')
    @ApiOperation({ summary: 'Sign up a new user' })
    @ApiBody({ type: () => SignUpDto })
    @ApiResponse({ status: 201, description: 'The user has been successfully signed up.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async signUp(@Body() signUpData: SignUpDto) {
        return this.authenticationService.signup(signUpData)
    }

    @HttpCode(200)
    @Post('login')
    @ApiOperation({ summary: 'Log in a user' })
    @ApiBody({ type: () => LogInDto })
    @ApiResponse({ status: 200, description: 'Login successful.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async logIn(@Body() logInData: LogInDto) {
        const user = await this.authenticationService.login(logInData)

        if (!user) {
            throw new HttpException('Exception found in AuthenticationController: login', HttpStatus.BAD_REQUEST)
        }
        // Step 4: Return the user object (optional), or a response message
        // Note: Cookies are still set automatically by NestJS if you use standard HTTP handling

        // Return user data or success message
        return {
            message: 'Login successful',
            user: user,
        };
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('logout')
    @ApiOperation({ summary: 'Log out a user' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Logout successful.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    logout(@Req() req: RequestWithUser) {
        this.authenticationService.logout(req.user.id)
    }

    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    @ApiOperation({ summary: 'Refresh tokens' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Tokens refreshed successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    refreshTokens(@Req() req: RequestWithUser) {
        return this.authenticationService.updateRefreshToken(req.user.id, req.user.username, req.user.email, req.user.role)
    }
}