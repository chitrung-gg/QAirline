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
        if (await this.userRepository.findOne({where: {username: user.username}})) {
            throw new HttpException('Username already registered', HttpStatus.FORBIDDEN)
        }
        if (await this.userRepository.findOne({where: {email: user.email}})) {
            throw new HttpException('Email already registered', HttpStatus.FORBIDDEN)
        }
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
            // return null
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

    async generateEmailVerificationForRegister(email: string) {
        const user = await this.userRepository.findOne({ where: { email: email } });
        if (user) {
          throw new HttpException('User already registered', HttpStatus.FOUND);
        }
    
        const otp = await this.verificationTokenService.generateOtp(user.id);
    
        /* Uncomment for send email */
        // this.emailService.sendEmail({
        //     subject: 'QAirline - Account Verification',
        //     recipient: user.email,
        //     content: `<!DOCTYPE html>
        //             <html lang="en">
        //             <head>
        //                 <meta charset="UTF-8">
        //                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //                 <title>OTP Verification</title>
        //                 <style>
        //                     body {
        //                         font-family: Arial, sans-serif;
        //                         background-color: #f4f4f9;
        //                         margin: 0;
        //                         padding: 0;
        //                     }
        //                     .email-container {
        //                         background-color: #ffffff;
        //                         margin: 50px auto;
        //                         padding: 30px;
        //                         max-width: 600px;
        //                         border-radius: 8px;
        //                         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        //                     }
        //                     h1 {
        //                         font-size: 24px;
        //                         color: #333;
        //                     }
        //                     p {
        //                         font-size: 16px;
        //                         line-height: 1.6;
        //                         color: #555;
        //                     }
        //                     .otp {
        //                         font-size: 24px;
        //                         font-weight: 700;
        //                         color: #4CAF50;
        //                         background-color: #f0f8f4;
        //                         padding: 10px 20px;
        //                         border-radius: 5px;
        //                         display: inline-block;
        //                     }
        //                     .footer {
        //                         margin-top: 30px;
        //                         font-size: 14px;
        //                         color: #888;
        //                         text-align: center;
        //                     }
        //                 </style>
        //             </head>
        //             <body>
        //                 <div class="email-container">
        //                     <h1>Hello${user.firstName ? ' ' + user.firstName : ''}${user.lastName ? ' ' + user.lastName : ''},</h1>
        //                     <p>You may verify your QAirline account using the following OTP:</p>
        //                     <p><span class="otp">${otp}</span></p>
        //                     <p class="footer">Regards,<br />QAirline</p>
        //                 </div>
        //             </body>
        //             </html>`
        // });
    }
    
    async generateEmailVerificationForPassword(email: string) {
        const user = await this.userRepository.findOne({ where: { email: email } });

        if (!user) {
            throw new HttpException('User found', HttpStatus.NOT_FOUND);
        } else {
            const otp = await this.verificationTokenService.generateOtp(user.id);

            /* Uncomment for send email */
            // this.emailService.sendEmail({
            //     subject: 'QAirline - Account Verification',
            //     recipient: user.email,
            //     content: `<!DOCTYPE html>
            //             <html lang="en">
            //             <head>
            //                 <meta charset="UTF-8">
            //                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
            //                 <title>OTP Verification</title>
            //                 <style>
            //                     body {
            //                         font-family: Arial, sans-serif;
            //                         background-color: #f4f4f9;
            //                         margin: 0;
            //                         padding: 0;
            //                     }
            //                     .email-container {
            //                         background-color: #ffffff;
            //                         margin: 50px auto;
            //                         padding: 30px;
            //                         max-width: 600px;
            //                         border-radius: 8px;
            //                         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            //                     }
            //                     h1 {
            //                         font-size: 24px;
            //                         color: #333;
            //                     }
            //                     p {
            //                         font-size: 16px;
            //                         line-height: 1.6;
            //                         color: #555;
            //                     }
            //                     .otp {
            //                         font-size: 24px;
            //                         font-weight: 700;
            //                         color: #4CAF50;
            //                         background-color: #f0f8f4;
            //                         padding: 10px 20px;
            //                         border-radius: 5px;
            //                         display: inline-block;
            //                     }
            //                     .footer {
            //                         margin-top: 30px;
            //                         font-size: 14px;
            //                         color: #888;
            //                         text-align: center;
            //                     }
            //                 </style>
            //             </head>
            //             <body>
            //                 <div class="email-container">
            //                     <h1>Hello${user.firstName ? ' ' + user.firstName : ''}${user.lastName ? ' ' + user.lastName : ''},</h1>
            //                     <p>You may change your QAirline account password using the following OTP:</p>
            //                     <p><span class="otp">${otp}</span></p>
            //                     <p class="footer">Regards,<br />QAirline</p>
            //                 </div>
            //             </body>
            //             </html>`
            // });
            

        }

    }

    async verifyEmail(userId: number, token: string) {
        const invalidMessage = '';

        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new HttpException('Invalid or expired OTP', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const isValid = await this.verificationTokenService.validateOtp(
            user.id,
            token,
        );

        if (!isValid) {
            throw new HttpException('Invalid or expired OTP', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        await this.userRepository.save(user);

        return true;
    }
}