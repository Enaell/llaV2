import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { EmailService } from './email.service'

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/contact')
  async sendMail(@Res() res, @Body() form: {name: string, email: string, subject: string, comments: string}) {
    console.log(form);
    const { name, email, subject, comments } = form
    return this.emailService.landingContact(name, email, subject, comments);
  }
}
