import { Injectable } from '@nestjs/common';
import { CreatePolicyDto } from './dto/createPolicy.dto';
import { UpdatePolicyDto } from './dto/updatePolicy.dto';

@Injectable()
export class PolicyService {
  create(createPolicyDto: CreatePolicyDto) {
    return 'This action adds a new policy';
  }

  findAll() {
    return `This action returns all policy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} policy`;
  }

  update(id: number, updatePolicyDto: UpdatePolicyDto) {
    return `This action updates a #${id} policy`;
  }

  remove(id: number) {
    return `This action removes a #${id} policy`;
  }
}
