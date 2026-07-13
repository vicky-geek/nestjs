import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GmailModule } from 'src/gmail/gmail.module';
@Module({
  imports: [GmailModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
