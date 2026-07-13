import { Injectable } from '@nestjs/common';
import { GmailService } from '../gmail/gmail.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly gmailService: GmailService) {}

  async register(registerDto: RegisterDto) {
    console.log("registerDto=>", registerDto);
    console.log("gmailService=>", process.env.PORT);
    const emailResult = this.gmailService.sendEmail(registerDto.email);

    return {
      message: 'User registered successfully',
      email: emailResult,
    };
  }
}
