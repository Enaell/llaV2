import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from "@nestjs/microservices";


@Module({
  imports: [ClientsModule.register([{
    name: 'USER_CLIENT',
    transport: Transport.TCP,
    options: {
      host: 'users',
      port: 4010,
    }
  }])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
