import { PartialType } from '@nestjs/swagger';
import { CreateEmailDto } from './createEmail.dto';

export class UpdateEmailDto extends PartialType(CreateEmailDto) {}
