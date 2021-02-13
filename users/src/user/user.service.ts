import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/users.schema';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  async findOne(username: string): Promise<User> {
    Logger.log(username);
    
    const user = await this.userModel.findOne({username});
    Logger.log(user)
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(createUser: CreateUserDTO): Promise<User> {
    try {
      /**
       * Perform all needed checks
       */
      const hashPswd = await hash(createUser.password, 10);  

      const createdUser = new this.userModel({...createUser, password: hashPswd});

      const res = await createdUser.save();

      Logger.log('createUser - Created user');

      return res;
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }

  async updateUser(updateUser: {username: string, updates: UpdateUserDTO}): Promise<User> {
    try {
      const { username, updates } = updateUser;
      const password = updates.password ? await hash(updates.password, 10): undefined; 
      const user = await this.userModel.findOneAndUpdate({username},  {...updates, password});
      return 
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }
}