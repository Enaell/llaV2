import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) { }

  public landingContact(name: string, email: string, subject: string, comments: string) {
    this
      .mailerService
      .sendMail({
        to: process.env.EMAIL_ADDRESS, // List of receivers email address
        from: email, // Senders email address
        subject: ` [LLA][CONTACT] ${subject}`, // Subject line
        text: comments, // plaintext body
        html: `<b>${comments}</b> <b>Contact Email : ${email}</b>`, // HTML body content
      })
      .then((success) => {
        console.log(success)
        return success;
      })
      .catch((err) => {
        console.log(err)
        throw new InternalServerErrorException("Couldn't send Email properly");
      });
  }
}
