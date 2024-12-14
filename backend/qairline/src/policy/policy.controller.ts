import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/createPolicy.dto';
import { UpdatePolicyDto } from './dto/updatePolicy.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('policy')
@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new policy' })
  @ApiBody({ type: () => CreatePolicyDto })
  @ApiResponse({ status: 201, description: 'The policy has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createPolicy(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policyService.createPolicy(createPolicyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all policies' })
  @ApiResponse({ status: 200, description: 'Return all policies.' })
  getAllPolicy() {
    return this.policyService.getAllPolicy();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get policy by ID' })
  @ApiParam({ name: 'id', description: 'ID of the policy', example: 1 })
  @ApiResponse({ status: 200, description: 'Return the policy with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Policy not found.' })
  getPolicyById(@Param('id') id: number) {
    return this.policyService.getPolicyById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update policy by ID' })
  @ApiParam({ name: 'id', description: 'ID of the policy', example: 1 })
  @ApiBody({ type: () => UpdatePolicyDto })
  @ApiResponse({ status: 200, description: 'The policy has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Policy not found.' })
  async updatePolicy(@Param('id') id: number, @Body() updatePolicyDto: UpdatePolicyDto) {
    return this.policyService.updatePolicy(id, updatePolicyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete policy by ID' })
  @ApiParam({ name: 'id', description: 'ID of the policy', example: 1 })
  @ApiResponse({ status: 200, description: 'The policy has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Policy not found.' })
  async deletePolicy(@Param('id') id: number) {
    return this.policyService.deletePolicy(id);
  }
}
