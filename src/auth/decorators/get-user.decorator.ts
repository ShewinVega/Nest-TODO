import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { UserEntity } from '@user/entities/user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {

    const req = ctx.switchToHttp().getRequest();
    const user: UserEntity = req.user;

    if(!user) {
      throw new InternalServerErrorException(`User not found (request)`);
    }
    return user;

  }
);
