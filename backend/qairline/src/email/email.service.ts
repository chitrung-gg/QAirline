import { Inject, Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/createEmail.dto';
import { UpdateEmailDto } from './dto/updateEmail.dto';
import { ConfigService } from '@nestjs/config';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,
    private myOAuth2Client: OAuth2Client,
    @Inject('MAIL_TRANSPORT') private mailTransport: Transporter
  ) {
    this.initializeOAuthClient();
  }

  private async initializeOAuthClient() {
    this.myOAuth2Client = new OAuth2Client(
      process.env.GOOGLE_MAILER_CLIENT_ID,
      process.env.GOOGLE_MAILER_CLIENT_SECRET,
    );
    this.myOAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN
    });

    const myAccessTokenObject = await this.myOAuth2Client.getAccessToken();

    this.mailTransport = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('ADMIN_EMAIL_ADDRESS'),
        clientId: this.configService.get('GOOGLE_MAILER_CLIENT_ID'),
        clientSecret: this.configService.get('GOOGLE_MAILER_CLIENT_SECRET'),
        refreshToken: this.configService.get('GOOGLE_MAILER_REFRESH_TOKEN'),
        accessToken: myAccessTokenObject.token
      },
    });
  }

  async sendEmail(data: CreateEmailDto): Promise<{ success: boolean } | null> {
    console.log(data)
    const mailOptions: SendMailOptions = {
      // from: {
      //   name: this.configService.get('MAIL_SENDER_NAME_DEFAULT'),
      //   address: this.configService.get('MAIL_SENDER_DEFAULT'),
      // },
      to: data.recipient,
      subject: data.subject,
      html: data.content
    };

    try {
      await this.mailTransport.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      // handle error
      return null;
    }
  }
}
