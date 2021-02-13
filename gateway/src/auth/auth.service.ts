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

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.client.send({ role: 'user', cmd: 'get' }, { username })
      .pipe(
        timeout(5000), 
        catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),)
      .toPromise();
      

      Logger.log(password);
      Logger.log(user)
      const allowed  = await compare(password, user?.password)
      return allowed ? user : null;
      
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }

  async login(user) {
    const payload = { user};
    Logger.log(payload);
    return {
      // userId: user.id,
      accessToken: this.jwtService.sign(payload)
    };
  }

  async validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}