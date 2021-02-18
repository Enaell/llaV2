import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Userboard, UserboardDocument } from 'src/schemas/userboard.schema';
import { UpdateUserboardDTO } from './dto/update-userboard.dto';

@Injectable()
export class UserboardService {
  constructor(
    @InjectModel(Userboard.name)
    private readonly userboardModel: Model<UserboardDocument>,
  ) {}

  async updateUserboard(updatedUserboard: {id: string, updates: UpdateUserboardDTO}): Promise<Userboard> {
    try {
      const { id, updates } = updatedUserboard;
      const userboard = await this.userboardModel.findByIdAndUpdate({_id: id, updates});
      Logger.log('userboard updated');
      return userboard;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }
}
