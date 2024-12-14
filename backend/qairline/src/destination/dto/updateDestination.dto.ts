import { PartialType } from '@nestjs/mapped-types';
import { CreateDestinationDto } from './createDestination.dto';

export class UpdateDestinationDto extends PartialType(CreateDestinationDto) {}
