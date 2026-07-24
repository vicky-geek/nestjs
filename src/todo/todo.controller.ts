import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/createTodo';
import { TodoService } from './todo.service';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from 'src/auth/authGouard';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}
    @UseGuards(AuthGuard,AuthorizationGuard)
    @Roles('admin')
    @Post('create/:userId')
    async createTodo(@Param('userId') userId: string, @Body() createTodoDto: CreateTodoDto) {
        return await this.todoService.createTodo(Number(userId), createTodoDto);
    }
}
