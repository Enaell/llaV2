import { Controller, UseGuards, Get, Body, Res, HttpStatus, Post, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { FindUserDTO } from './dto/find-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from './schemas/users.schema';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: FindUserDTO): Promise<User> {
    Logger.log('Try get user');
    Logger.log(data)
    return this.userService.findOne(data.username);
  }

  @MessagePattern({ role: 'user', cmd: 'create' })
  async createUser(data: CreateUserDTO): Promise<User> {
    Logger.log('Try create user');
    Logger.log(data)
    const user = await this.userService.createUser(data);
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('greet') 
  async greet(): Promise<string> {
    return 'Greetings authenticated user';
  }
}