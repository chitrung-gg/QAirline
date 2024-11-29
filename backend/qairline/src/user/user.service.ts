import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    
    async createUser(user: CreateUserDto) {
        const newUser = await this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async getAllUsers() {
        return this.userRepository.find()
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: id
            }
        })
        if (user) {
            return user
        } else {
            console.log('Exception found in UserService: getById')
            // throw new HttpException('No user found', HttpStatus.NOT_FOUND)
        }
    }
    
    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            return user
        } else {
            console.log('Exception found in UserService: getByEmail')
            // throw new HttpException('User with this email not exists', HttpStatus.NOT_FOUND)
        }
    }

    async updateUser(id: number, user: UpdateUserDto) {
        await this.userRepository.update(id, user)
        this.getUserById(id)
    }

    async deleteFlight(id: number) {
        const deleteResponse = await this.userRepository.delete(id)
        if (!deleteResponse.affected) {
            throw new HttpException('Exception found in UserService: deleteUser', HttpStatus.NOT_FOUND);
        }
    }

    async setCurrentRefreshToken(refreshToken: string, userId: number) {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userRepository.update(userId, {
            currentHashedRefreshToken
        });
    }

    async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
        const user = await this.getUserById(userId);
     
        const isRefreshTokenMatching = await bcrypt.compare(
            refreshToken,
            user.currentHashedRefreshToken
        );
     
        if (isRefreshTokenMatching) {
            return user;
        }
    }
}