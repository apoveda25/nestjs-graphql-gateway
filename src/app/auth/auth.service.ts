import {
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  IAuthServiceGrpc,
  ISearchUserScopes,
} from './interfaces/auth-service.interface';

@Injectable()
export class AuthService implements OnModuleInit {
  private authServiceGrpc: IAuthServiceGrpc;

  constructor(@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authServiceGrpc = this.client.getService<IAuthServiceGrpc>(
      'AuthService',
    );
  }

  async searchUserScopes(searchUserScopes: ISearchUserScopes) {
    try {
      return await this.authServiceGrpc
        .searchUserScopes(searchUserScopes)
        .toPromise();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}