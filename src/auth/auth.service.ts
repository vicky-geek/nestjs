import { ConflictException, Injectable } from '@nestjs/common';
import { GmailService } from '../gmail/gmail.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly gmailService: GmailService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(registerDto: RegisterDto) {
      const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
      },
    });
    const token = await this.jwtService.signAsync({ email: user.email });
    console.log("token=>", token);
    const refreshToken = await this.jwtService.signAsync({ email: user.email }, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' });
    console.log("refreshToken=>", refreshToken);


    const emailResult = this.gmailService.sendEmail(user.email);

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      email: emailResult,
      token,
      refreshToken,
    };
  }
}
