import { PartialType } from '@nestjs/swagger';
import { CreateAboutusDto } from './createAboutus.dto';

export class UpdateAboutusDto extends PartialType(CreateAboutusDto) {}
