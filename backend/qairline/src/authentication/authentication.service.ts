import { Body, HttpException, HttpStatus, Inject, Injectable, Post } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserService } from "src/user/user.service";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { SignUpDto } from "./dto/signUp.dto";
import { LogInDto } from "./dto/logIn.dto";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        // @Inject(CACHE_MANAGER)
        // private cacheManager: Cache
    ) {}

    // async register(registrationData: RegisterDto) {
    //     const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    //     try {
    //         const createdUser = await this.userService.createUser({
    //             ...registrationData,
    //             password: hashedPassword
    //         });
    //         // createdUser.password = undefined;
    //         return createdUser;
    //     } catch (error) {
    //         console.log(error)
    //         throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    
    // public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    //     try {
    //         const user = await this.userService.getUserByEmail(email);
    //         await this.verifyPassword(plainTextPassword, user.password);
    //         user.password = undefined;
    //         return user;
    //     } catch (error) {
    //         throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    //     }
    // }
   
    // private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    //     const isPasswordMatching = await bcrypt.compare(
    //         plainTextPassword,
    //         hashedPassword
    //     );
    //     if (!isPasswordMatching) {
    //         throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    //     }
    // }

    // public getCookieWithJwtToken(userId: number) {
    //     const payload: TokenPayload = { userId };
    //     const token = this.jwtService.sign(payload);
    //     return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    // }

    // public getCookieForLogOut() {
    //     return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    // }

    async signup(signUpData: SignUpDto) {
        // console.log(signUpData.email)
        const emailInUse = await this.userService.getUserByEmail(signUpData.email)
        if (emailInUse) {
            throw new HttpException('Email already used', HttpStatus.BAD_REQUEST)
        }

        const hashedPassword = await bcrypt.hash(signUpData.password, 10)

        await this.userService.createUser({
            ...signUpData,
            // TODO: Change password to hashed type when deploying
            // password: hashedPassword,
        })
    }

    async login(@Body() logInData: LogInDto) {
        const userInDb = await this.userService.getUserByEmail(logInData.email)
        if (!userInDb) {
            throw new HttpException('Wrong login credentials in userInDb', HttpStatus.BAD_REQUEST)
        }

        const hashedPassword = await bcrypt.hash(userInDb.password, 10)
        // TODO: change password to encrypted form before deploying
        // const passwordMatch = await bcrypt.compare(logInData.password, userInDb.password)
        const passwordMatch = await bcrypt.compare(logInData.password, hashedPassword)
        if (!passwordMatch) {
            throw new HttpException('Wrong login credentials in passwordMatch', HttpStatus.BAD_REQUEST)
        }

        // const payload = { email: userInDb.email, password: userInDb.password, id: userInDb.id};
        // return {
        //     access_token: this.jwtService.sign(payload),
        // };

        const tokens = await this.getTokens(userInDb.id, userInDb.username)
        await this.updateRefreshToken(userInDb.id, userInDb.username)
        return tokens
    }

    async validateUser(email: string, password: string) {
        try {
            const user = await this.userService.getUserByEmail(email);
            const hashedPassword = await bcrypt.hash(password, 10)
            const isPasswordMatching = await bcrypt.compare(
                hashedPassword,
                user.password
            );
            if (!isPasswordMatching) {
              throw new HttpException('Wrong credentials provided in validateUser', HttpStatus.BAD_REQUEST);
            }

            return user;
        } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    async logout(userId: number) {
        return this.userService.updateUser(userId, {refreshToken: null})
    }
    // getCookieWithJwtAccessToken(userId: number) {
    //     const payload = { userId };
    //     const token = this.jwtService.sign(payload, {
    //       secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    //       expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')
    //     });
    //     return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
    // }
     
    // getCookieWithJwtRefreshToken(userId: number) {
    //     const payload = { userId };
    //     const token = this.jwtService.sign(payload, {
    //         secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    //         expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')
    //     });
    //     const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
    //     return {
    //         cookie,
    //         token
    //     }
    // }

    async getTokens(userId: number, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.sign(
            {
              sub: userId,
              username,
            },
            {
              secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
              expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
            },
          ),
          this.jwtService.sign(
            {
              sub: userId,
              username,
            },
            {
              secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
              expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
            },
          ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.userService.getUserById(userId);
        if (!user || !user.refreshToken) {
            throw new HttpException('Access Denied', HttpStatus.FORBIDDEN)
        }
        const refreshTokenMatches = await bcrypt.compare(user.refreshToken, refreshToken);
        if (!refreshTokenMatches) {
            throw new HttpException('Access Denied', HttpStatus.FORBIDDEN)
        }   
        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }


    async updateRefreshToken(userId: number, username: string) {
        const token = this.jwtService.sign({
            userId,
            username
        }, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
        });
        await this.userService.updateUser(userId,  {
            refreshToken: token
        });
        return await this.getTokens(userId, username)
    }
}