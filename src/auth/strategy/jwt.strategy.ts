import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@user/user.service';
import { JwtPayload } from '../interface/auth-payload.interface';
import { UserEntity } from '@user/entities/user.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor( 
    private userServices: UserService,
    private configServices: ConfigService,
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configServices.get<string>('secretKey')
    });
  }


  async validate(payload: JwtPayload): Promise<UserEntity> {

    const user = await this.userServices.findOne(payload.id);

    return user.data;

  }

}