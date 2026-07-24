import { Module } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { DummyEmailService } from './dummy-email.service';
import { EmailService } from './email.service';

@Module({
  providers: [GmailService
    , DummyEmailService
    , {
      provide: EmailService,
      useClass: process.env.NODE_ENV === 'production' ? GmailService : DummyEmailService,
    }],
  exports: [EmailService]
})
export class GmailModule {}
