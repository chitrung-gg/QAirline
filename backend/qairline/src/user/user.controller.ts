import { Body, Controller, Get, HttpException, HttpStatus, Post, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthenticationGuard } from "src/authentication/guard/jwtAuthentication.guard";
import { CreateUserDto } from "./dto/createUser.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";

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
}