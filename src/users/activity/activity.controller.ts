import { Controller, Get } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('users/:userId/activity')  // if we need create nested route we can use this syntax also we can create another model for this like activity.module.ts
export class ActivityController {
    constructor(private readonly activityService: ActivityService) {}

    @Get()
    findAll() {
        return this.activityService.findAll(    );
    }
}
