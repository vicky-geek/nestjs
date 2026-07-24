// gmail.service.ts

import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';

@Injectable()
export class GmailService extends EmailService {

  async sendEmail(
    to: string,
    subject: string,
    body: string,
  ) {

    console.log('Sending real email using Gmail...');

    // Nodemailer logic here

  }

}