import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getAll() {
        return this.userRepository.find()
    }

    async getById(id: number) {
        const user = await this.userRepository.findOne({where: {id: id}})
        if (user) {
            return user
        } else {
            console.log('Exception found in UserService: getById')
            // throw new HttpException('No user found', HttpStatus.NOT_FOUND)
        }
    }
    
    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email: email}})
        if (user) {
            return user
        } else {
            console.log('Exception found in UserService: getByEmail')
            // throw new HttpException('User with this email not exists', HttpStatus.NOT_FOUND)
        }
    }

    async create(userData: CreateUserDto) {
        const newUser = await this.userRepository.create(userData);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async setCurrentRefreshToken(refreshToken: string, userId: number) {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userRepository.update(userId, {
            currentHashedRefreshToken
        });
    }

    async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
        const user = await this.getById(userId);
     
        const isRefreshTokenMatching = await bcrypt.compare(
            refreshToken,
            user.currentHashedRefreshToken
        );
     
        if (isRefreshTokenMatching) {
            return user;
        }
    }
}