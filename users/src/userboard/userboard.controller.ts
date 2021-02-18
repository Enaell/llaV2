import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Userboard } from 'src/schemas/userboard.schema';
import { UpdateUserboardDTO } from './dto/update-userboard.dto';
import { UserboardService } from './userboard.service';

@Controller('/userboard')
export class UserboardController {
  constructor(
    private readonly userboardService: UserboardService
  ) {}

  @MessagePattern({ role: 'userboard', cmd: 'update' })
  async updateUser(data: { id: string, updates: UpdateUserboardDTO}): Promise<Userboard> {
    Logger.log('Try update userboard');
    Logger.log(data)
    const user = await this.userboardService.updateUserboard(data);
    return user;
  }

}
