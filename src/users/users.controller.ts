import { Controller, Get, Post, Body, Patch, Param, Delete,Request, Req, Query, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivityService } from './activity/activity.service';
import { AuthGuard } from 'src/auth/authGouard';
import { AddProfileDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly activityService: ActivityService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    console.log("createUserDto=>", createUserDto);
    console.log("req=>", req.body);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard) 
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Get('user/byname')
  UsingQueryParams(@Query('name') name: string) {
    console.log("name=>", name);
    return this.usersService.UsingQueryParams(name);
  }

  // @Get('user/byname')
  // UsingQueryParams(@Query() allQueryParams: any) {  //get all the query params
  //   console.log("allQueryParams=>", allQueryParams);
  //   return this.usersService.UsingQueryParams(name);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


  @Get(':userId/activity1')
  getActivity(@Param('userId') userId: string) {
    return this.activityService.findAll();
  }

  @UseGuards(AuthGuard) 
  @Post('add-profile/:id')
  async addProfile(@Param('id') id: string, @Body() addProfileDto: AddProfileDto) {
    return await this.usersService.addProfile(id, addProfileDto);
  }
}
