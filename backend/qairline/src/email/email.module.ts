import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';

@Module({
  imports: [ConfigModule],
  controllers: [EmailController],
  providers: [EmailService,
    {
      provide: 'MAIL_TRANSPORT',
      useFactory: (configService: ConfigService): Transporter => {
        return createTransport({
          host: configService.get('MAIL_HOST'),
          port: Number(configService.get('MAIL_PORT')),
          secure: false, // Upgrade later with STARTTLS
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        });
      },
      inject: [ConfigService], // Inject the ConfigService to the factory function
    },
    {
      provide: OAuth2Client,
      useFactory: () => new OAuth2Client(), // create a new instance of OAuth2Client
    },
  ],
  exports: [EmailService]
})
export class EmailModule {}
