
import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get, HttpException, HttpStatus, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import RequestWithUser from './interface/requestWithUser.interface';
import { LocalAuthenticationGuard } from './guard/localAuthentication.guard';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthenticationGuard } from './guard/jwtAuthentication.guard';
import { Request, Response } from 'express';
import { User } from 'src/user/entity/user.entity';
import { SignUpDto } from './dto/signUp.dto';
import { LogInDto } from './dto/logIn.dto';
import JwtRefreshGuard from './guard/jwtRefresh.guard';

 
@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}
    
    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }
    
    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user
        user.password = undefined
        return user
    }

    // @HttpCode(200)
    // @UseGuards(JwtAuthenticationGuard)
    // @Post('login')
    // // NOTE: 
    // async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    //     const { user } = request;
    //     const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    //     response.setHeader('Set-Cookie', cookie);
    //     user.password = undefined;
    //     return response.json(user);

    // }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Post('logout')
    async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
        response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        return response.sendStatus(200);
    }

    @Post('signup')
    async signUp(@Body() signUpData: SignUpDto) {
        return this.authenticationService.signup(signUpData)
    }

    @Post('login')
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

}