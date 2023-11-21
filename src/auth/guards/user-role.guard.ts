import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { UserEntity } from '@user/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector, // Reflector allow us to catch data or information from the decorators or metadata.
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    // create variable in order to get the metadata from our method
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

    // we are going to check is the valid roles are empty
    if(!validRoles) return false;

    const req = context.switchToHttp().getRequest();
    const user: UserEntity = req.user;

    if(!user) {
      throw new BadRequestException(`User not Found!`);
    }

    if(validRoles.includes(user.role)) {
      return true;
    }

    throw new ForbiddenException(` User ${ user.name } needs to have a valid role`);

  }
}
