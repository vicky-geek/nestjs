import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/createTodo';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
    constructor(private readonly prisma: PrismaService) {}
    async createTodo(userId: number, createTodoDto: CreateTodoDto) {
        try {
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
                            connectOrCreate: {
                                where: { name: tag },
                                create: { name: tag },
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
        } catch (error) {
            console.log('error=>', error);
            throw new BadRequestException('Failed to create todo');
        }
    }
}   
