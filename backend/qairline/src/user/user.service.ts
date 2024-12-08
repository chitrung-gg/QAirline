import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from "./dto/updateUser.dto";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { VerificationService } from "src/verification/verification.service";
import { EmailService } from "src/email/email.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
        private verificationTokenService: VerificationService,
        private emailService: EmailService,
    ) {}
    
    async createUser(user: CreateUserDto) {
        await this.cacheManager.reset()
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
        await this.cacheManager.reset()
        try {
            await this.getUserById(id)
            await this.userRepository.update(id, user)
        } catch (error) {
            throw new HttpException('Exception found in UserService: updateUser', HttpStatus.BAD_REQUEST)
        }
    }

    async deleteUser(id: number) {
        await this.cacheManager.reset()
        const deleteResponse = await this.userRepository.delete(id)
        if (!deleteResponse.affected) {
            throw new HttpException('Exception found in UserService: deleteUser', HttpStatus.NOT_FOUND);
        }
    }

    async generateEmailVerification(userId: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    
        console.log('User found')
        // if (user.status === "Active") {
        //   throw new HttpException('Account already active', HttpStatus.UNPROCESSABLE_ENTITY);
        // }
    
        const otp = await this.verificationTokenService.generateOtp(user.id);
    
        this.emailService.sendEmail({
            subject: 'QAirline - Account Verification',
            recipient: user.email,
            content: `<p>Hi${user.firstName ? ' ' + user.lastName : ''},</p><p>You may verify your QAirline account using the following OTP: <br /><span style="font-size:24px; font-weight: 700;">${otp}</span></p><p>Regards,<br />QAirline</p>`,
        });
    }

    async verifyEmail(userId: number, token: string) {
        const invalidMessage = '';

        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new HttpException('Invalid or expired OTP', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (user.status === "Active") {
            throw new HttpException('Account already active', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const isValid = await this.verificationTokenService.validateOtp(
            user.id,
            token,
        );

        if (!isValid) {
            throw new HttpException('Invalid or expired OTP', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        user.status = 'Active';

        await this.userRepository.save(user);

        return true;
    }
}