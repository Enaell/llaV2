import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService){}

  
  @Post('/')
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
      const news = await this.usersService.createUser(createUserDTO);
      return res.status(HttpStatus.OK).json({
          message: "User has been created successfully",
          news
      })
  }

}
