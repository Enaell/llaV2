import { Inject, Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy) {}



  async createUser(createUserDTO: CreateUserDTO): Promise<any> {
    try {
      const user = await this.client.send({role: 'user', cmd: 'create'}, createUserDTO)
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

}
