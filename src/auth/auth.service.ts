import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { EmailService } from '../gmail/email.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly EmailService: EmailService,
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


    const emailResult = await this.EmailService.sendEmail(user.email, 'Welcome to our app', 'Thank you for registering!');

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

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    console.log("user=>", user);
    const token = await this.jwtService.signAsync({ email: user.email, role: user.role });
    const refreshToken = await this.jwtService.signAsync(
      { email: user.email, role: user.role },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
    );

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    };
  }
}
