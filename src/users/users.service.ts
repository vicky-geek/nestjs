import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  UsingQueryParams(name: string) {
    return {"message": "Users fetched successfully","data":[{"id":1,"name":name,"email":"john.doe@example.com","password":"123456"}]};
  }

  create(createUserDto: CreateUserDto) {
    console.log("createUserDto=>", createUserDto);
    
    return 'This action adds a new user';
  }

  findAll() {
    return {"message": "Users fetched successfully","data":[{"id":1,"name":"John Doe","email":"john.doe@example.com","password":"123456"}]};
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
      where: {
        id: id,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
