import { Inject, Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateUserDTO } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<any> {
    try {
      Logger.log('try create user')
      Logger.log(createUserDTO)
      const user = await this.client.send({role: 'user', cmd: 'create'}, {...createUserDTO, name: createUserDTO.username})
      .pipe(
        timeout(5000), 
        catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),)
      .toPromise();

      Logger.log(user);
      return user;
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }

  async getUser(username: string) {
    try {
      const user = await this.client.send({role: 'user', cmd: 'get'}, {username})
      .pipe(
        timeout(5000), 
        catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),)
      .toPromise();

      Logger.log(user);
      return user
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }

  async updateUser(username: string, userUpdates: UpdateUserDTO) {
    try {
      const user = await this.client.send({role: 'user', cmd: 'update'}, {username, updates: userUpdates})
      .pipe(
        timeout(5000), 
        catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),)
      .toPromise();

      Logger.log(user);
      return user
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }

}
