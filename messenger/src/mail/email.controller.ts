import { Controller, Get, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { EmailService } from './email.service'

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/contact')
  async sendMail(@Res() res, @Body() form: {name: string, email: string, subject: string, comments: string}) {
    const { name, email, subject, comments } = form
    if (!name || !email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) || !subject || !comments)
      throw res.status(HttpStatus.BAD_REQUEST).json({message: 'At least one Argument was wrong'})
    const success = await this.emailService.landingContact(name, email, subject, comments);
    return res.status(HttpStatus.OK).json({
      message: 'Message successfuly send by email',
      success
    })
  }
}
