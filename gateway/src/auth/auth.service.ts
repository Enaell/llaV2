import { Injectable, Inject, Logger, RequestTimeoutException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
    private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    Logger.log(email)
    Logger.log(password)
    try {
      const loggingInfo = await this.client.send({ role: 'user', cmd: 'logging' }, { email })
      .pipe(
        timeout(5000), 
        catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        Logger.log('===================================')
        Logger.log(err);
        return throwError(err);
      }),)
      .toPromise();

      Logger.log(loggingInfo);
      Logger.log(password);
      const allowed  = await compare(password, loggingInfo?.password)
      return allowed ? loggingInfo.user : null;
      
    } catch(e) {
      Logger.log('-----------------------------------')
      Logger.log(e);
      throw e;
    }
  }
  
  async validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }

  async login(user) {
    // const payload = { user };
    Logger.log(user);
    return {
      ...user,
      token: this.jwtService.sign(user)
    };
  }
}