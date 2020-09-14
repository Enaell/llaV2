import { Injectable } from '@nestjs/common';
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
        html: `<b>${comments}</b>`, // HTML body content
      })
      .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log(err)
      });
  }
}
