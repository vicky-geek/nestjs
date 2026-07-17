import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/createTodo';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
    constructor(private readonly prisma: PrismaService) {}
    async createTodo(userId: number, createTodoDto: CreateTodoDto) {
        console.log('createTodo', userId, createTodoDto);
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return await this.prisma.todo.create({
            data: {
                title: createTodoDto.title,
                description: createTodoDto.description,
                tags: {
                    create: createTodoDto.tags.map(tag => ({
                        tag: {
                            connect: {
                                name: tag,
                            },
                        }, 
                    })),
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }
}   
