import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/createEmail.dto';
import { UpdateEmailDto } from './dto/updateEmail.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
}
