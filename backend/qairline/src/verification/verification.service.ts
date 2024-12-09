import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateVerificationDto } from './dto/createVerification.dto';
import { UpdateVerificationDto } from './dto/updateVerification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Verification } from './entity/verification.entity';
import { User } from 'src/user/entity/user.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}
  
  async generateOtp(userId: number, size: number = 6): Promise<string> {
    this.cacheManager.reset()
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });
    const now = new Date();
    const max = Math.pow(10, size);
    const randomNumber = Math.floor(Math.random() * max)

    const otp = randomNumber.toString().padStart(size, '0')
    const hashedToken = await bcrypt.hash(otp, 10);

    console.log("Expiration time:", new Date(now.getTime() + Number(process.env.TOKEN_EXPIRATION_MINUTES) * 60 * 1000).toISOString());


    const tokenEntityDto = {
      user: user,
      token: hashedToken,
      expiresAt: new Date(
        now.getTime() + Number(process.env.TOKEN_EXPIRATION_MINUTES) * 60 * 1000
      ).toISOString(),
      createdAt: new Date(
        now.getTime()
      ).toISOString()
    }

    const verificationEntity = await this.getVerificationByEmail(user.email)

    if (verificationEntity) {
      await this.updateVerification(verificationEntity.id, tokenEntityDto)
    } else {
      await this.createVerification(tokenEntityDto)
    }

    return otp;
  }

  async validateOtp(userId: number, token: string): Promise<boolean> {
    this.cacheManager.reset()
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });

    const validToken = await this.verificationRepository.findOne({
      where: { user: user, expiresAt: MoreThan(new Date().toISOString()) },
    });

    if (validToken && (await bcrypt.compare(token, validToken.token))) {
      await this.verificationRepository.remove(validToken);
      return true;
    } else {
      return false;
    }
  }

  async createVerification(verification: CreateVerificationDto) {
    await this.cacheManager.reset()
    const newVerification = await this.verificationRepository.create(verification)
    await this.verificationRepository.save(newVerification)
    return newVerification
  }

  getAllVerifications() {
    return this.verificationRepository.find()
  }

  async getVerificationById(id: number) {
    // TODO: may change to find with string for real case purposes
    const verification = await this.verificationRepository.findOne({
      where: {
        id: id
      }
    });
    if (verification) {
      return verification;
    }
    throw new HttpException('Exception found in VerificationService: getVerificationById', HttpStatus.BAD_REQUEST)
  }

  async getVerificationByEmail(email: string) {
    // TODO: may change to find with string for real case purposes
    const verification = await this.verificationRepository.findOne({
      where: {
        user: {email: email}
      }
    });
    if (verification) {
      return verification;
    } else {
      return verification || null;
      // throw new HttpException('Exception found in VerificationService: getVerificationByUser', HttpStatus.BAD_REQUEST)
    }
  }

  async updateVerification(id: number, Verification: UpdateVerificationDto) {
    await this.cacheManager.reset()
    try {
      await this.getVerificationById(id)
      await this.verificationRepository.update(id, Verification)
    } catch (error) {
      throw new HttpException('Exception found in VerificationService: updateVerification', HttpStatus.BAD_REQUEST)
    }
  }

  async deleteVerification(id: number) {
    await this.cacheManager.reset()
    const deleteResponse = await this.verificationRepository.delete(id)
    if (!deleteResponse.affected) {
      throw new HttpException('Exception found in BookingService: deleteBooking', HttpStatus.NOT_FOUND);
    }
  }
}
