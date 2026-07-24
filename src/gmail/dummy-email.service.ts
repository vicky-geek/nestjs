// dummy-email.service.ts

import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';

@Injectable()
export class DummyEmailService extends EmailService {

  async sendEmail(
    to: string,
    subject: string,
    body: string,
  ) {

    console.log('========== DUMMY EMAIL ==========');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Body:', body);
    console.log('================================');

  }

}