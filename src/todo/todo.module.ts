import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';

@Module({
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('todo');
  }
}
