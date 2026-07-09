import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivityService {
    findAll() {
        return {"message": "Activities fetched successfully","data":[{"id":1,"name":"John Doe","email":"john.doe@example.com","password":"123456"}]};
    }
}
