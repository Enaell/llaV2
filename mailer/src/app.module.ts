import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: 'gmail',
          auth: {
            user: 'email@gmail.com',
            pass: 'psw'
          }
        },
        defaults: {
          from:'"nest-modules" <orelienmartin@hotmail.fr>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
