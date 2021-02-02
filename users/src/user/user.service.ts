import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
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

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    try {
      /**
       * Perform all needed checks
       */
      const hashPswd = await hash(createUserDTO.password, 10);  

      const createdUser = new this.userModel({...createUserDTO, password: hashPswd});

      const res = await createdUser.save();

      Logger.log('createUser - Created user');

      return res;
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }
}