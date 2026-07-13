import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GmailService } from 'src/gmail/gmail.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}  //dependency injection
    //similar 

    //private for we can't access the authService outside the class and read only for inside this class anycontroller can't changes the value of authService
    // private readonly authService: AuthService;    //dependency injection  //injection is a process of providing a dependency to a class
    // constructor() {
    //     this.authService = new AuthService();
    // }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
