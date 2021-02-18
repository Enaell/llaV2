import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User, UserDocument } from '../schemas/users.schema';
import { Userboard, UserboardDocument } from 'src/schemas/userboard.schema';
import { Mode } from 'fs';
import { formatUser, formatUserboard } from 'src/formatter';
import { ResponseUserDTO } from './dto/response-user-dto';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Userboard.name)
    private readonly userboardModel: Model<UserboardDocument>
  ) {}

  async findOne(username: string): Promise<User> {
    Logger.log(username);
    
    const user = await this.userModel.findOne({username});
    Logger.log('User found')
    Logger.log(user)
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(createUser: CreateUserDTO): Promise<ResponseUserDTO> {
    try {
      /**
       * Perform all needed checks
       */
      const hashPswd = await hash(createUser.password, 10);  
      const userboard = new this.userboardModel({})
      await userboard.save();

      Logger.log(userboard);

      const createdUser = new this.userModel({
        ...createUser,
        password: hashPswd,
        userboard: userboard
      });

      await createdUser.save();
      
      const res = formatUser(createdUser); 

      Logger.log('createUser - Created user');

      return res;
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }

  async updateUser(updatedUser: {username: string, updates: UpdateUserDTO}): Promise<User> {
    try {
      const { username, updates } = updatedUser;
      const password = updates.password ? await hash(updates.password, 10): undefined; 
      const user = await this.userModel.findOneAndUpdate({username},  {...updates, password});
      Logger.log('user updated');
      return user;
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }
}