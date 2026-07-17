import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/createTodo';
import { TodoService } from './todo.service';
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}
    @Post('create/:userId')
    async createTodo(@Param('userId') userId: string, @Body() createTodoDto: CreateTodoDto) {
        return await this.todoService.createTodo(Number(userId), createTodoDto);
    }
}
