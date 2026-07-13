import { Injectable } from '@nestjs/common';

@Injectable()
export class GmailService {
    sendEmail(email: string) {
        console.log("email=>", email);
        return {"message": "Email sent successfully","data":[{"id":1,"email":email}]};
    }
}
