import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, Request, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthenticationGuard } from "src/authentication/guard/jwtAuthentication.guard";
import { CreateUserDto } from "./dto/createUser.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";
import RequestWithUser from "src/authentication/interface/requestWithUser.interface";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUserDto } from "./dto/updateUser.dto";

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
    async getAllUsers(){
        return this.userService.getAllUsers();
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Get user with specified id' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Return user with this id.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async getUserById(@Param('id') id: number){
        return this.userService.getUserById(id);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBearerAuth()
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

    @UseGuards(JwtAuthenticationGuard)
    @Patch(':id')
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the user', example: 1 })
    @ApiBody({ type: () => UpdateUserDto })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }
  
    @UseGuards(JwtAuthenticationGuard)
    @Delete(':id') 
    @ApiOperation({ summary: 'Delete User by ID' })
    @ApiParam({ name: 'id', description: 'ID of the User', example: 1 })
    @ApiResponse({ status: 200, description: 'The User has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id)
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