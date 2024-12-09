import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePolicyDto } from './dto/createPolicy.dto';
import { UpdatePolicyDto } from './dto/updatePolicy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Policy } from './entity/policy.entity';
import { Repository } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}

  async createPolicy(policy: CreatePolicyDto) {
    await this.cacheManager.reset()
    const newPolicy = await this.policyRepository.create(policy)
    await this.policyRepository.save(newPolicy)
    return newPolicy
  }

  getAllPolicy() {
    return this.policyRepository.find()
  }

  async getPolicyById(id: number) {
    // TODO: may change to find with string for real case purposes
    const policy = await this.policyRepository.findOne({
      where: {
        id: id
      }
    });
    if (policy) {
      return policy;
    }
    throw new HttpException('Exception found in PolicyService: getPolicyById', HttpStatus.BAD_REQUEST)
  }

  async updatePolicy(id: number, policy: UpdatePolicyDto) {
    await this.cacheManager.reset()
    try {
      await this.getPolicyById(id)
      await this.policyRepository.update(id, policy)
    } catch (error) {
      throw new HttpException('Exception found in PolicyService: updatePolicy', HttpStatus.BAD_REQUEST)
    }
  }

  async deletePolicy(id: number) {
    await this.cacheManager.reset()
    const deleteResponse = await this.policyRepository.delete(id)
    if (!deleteResponse.affected) {
      throw new HttpException('Exception found in PolicyService: deletePolicy', HttpStatus.NOT_FOUND);
    }
  }
}
