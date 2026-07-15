import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GmailModule } from 'src/gmail/gmail.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './authGouard';
console.log("process.env.JWT_SECRET=>", process.env.JWT_SECRET);
@Module({
  imports: [
    GmailModule, 
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
