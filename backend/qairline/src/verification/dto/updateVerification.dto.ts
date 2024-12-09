import { PartialType } from '@nestjs/swagger';
import { CreateVerificationDto } from './createVerification.dto';

export class UpdateVerificationDto extends PartialType(CreateVerificationDto) {}
