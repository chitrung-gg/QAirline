import { Body, HttpException, HttpStatus, Injectable, Post } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserService } from "src/user/user.service";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { SignUpDto } from "./dto/signUp.dto";
import { LogInDto } from "./dto/logIn.dto";

@Injectable()
export class AuthenticationService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async register(registrationData: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            const createdUser = await this.userService.create({
                ...registrationData,
                password: hashedPassword
            });
            createdUser.password = undefined;
            return createdUser;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
            const user = await this.userService.getByEmail(email);
            await this.verifyPassword(plainTextPassword, user.password);
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }
   
    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }

    async signup(signUpData: SignUpDto) {
        // console.log(signUpData.email)
        const emailInUse = await this.userService.getByEmail(signUpData.email)
        if (emailInUse) {
            throw new HttpException('Email already used', HttpStatus.BAD_REQUEST)
        }

        const hashedPassword = await bcrypt.hash(signUpData.password, 10)

        await this.userService.create({
            ...signUpData,
            password: hashedPassword,
        })
    }

    async login(@Body() logInData: LogInDto) {
        const userInDb = await this.userService.getByEmail(logInData.email)
        if (!userInDb) {
            throw new HttpException('Wrong login credentials', HttpStatus.BAD_REQUEST)
        }

        const passwordMatch = await bcrypt.compare(logInData.password, userInDb.password)
        if (!passwordMatch) {
            throw new HttpException('Wrong login credentials', HttpStatus.BAD_REQUEST)
        }

        const accessTokenCookie = this.getCookieWithJwtAccessToken(userInDb.id);
        const refreshTokenCookie = this.getCookieWithJwtRefreshToken(userInDb.id);

        // Step 3: Set the refresh token in the database (persist the refresh token)
        await this.userService.setCurrentRefreshToken(refreshTokenCookie.token, userInDb.id);

        return {
            id: userInDb.id,
            userToken: refreshTokenCookie.token,
        }
    }

    async generateUserTokens(userId) {
        const accessToken = this.jwtService.sign({userId})
        return {accessToken}
    }

    public getCookieWithJwtAccessToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload, {
          secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')
        });
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
    }
     
    public getCookieWithJwtRefreshToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')
        });
        const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
        return {
            cookie,
            token
        }
    }
}