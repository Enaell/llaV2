import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { EmailService } from './email.service'

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/contact')
  async sendMail(@Res() res, @Body() form) {
    console.log(form);
    return this.emailService.example();
  }
}
