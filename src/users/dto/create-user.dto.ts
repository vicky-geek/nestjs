import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsOptional()
//   @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
// export class CreateUserDto {

//     name: string;
//     email: string;
//     password: string;
//   }



export class AddProfileDto {
  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;
}
