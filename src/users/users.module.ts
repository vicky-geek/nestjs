import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ActivityController } from './activity/activity.controller';
import { ActivityService } from './activity/activity.service';

@Module({
  controllers: [UsersController, ActivityController],
  providers: [UsersService, ActivityService],
})
export class UsersModule {}
