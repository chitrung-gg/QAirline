import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './createNews.dto';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}
