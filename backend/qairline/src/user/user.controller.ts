import { Body, Controller, Get, HttpException, HttpStatus, Post, UseFilters, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthenticationGuard } from "src/authentication/guard/jwtAuthentication.guard";
import { CreateUserDto } from "./dto/createUser.dto";

@Controller('user')
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