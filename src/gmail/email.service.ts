// email.service.ts

export abstract class EmailService {
    abstract sendEmail(
      to: string,
      subject: string,
      body: string,
    ): Promise<void>;
  }