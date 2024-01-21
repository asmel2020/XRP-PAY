import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '@prisma/client';
import { META_ROLES } from '../../decorators';


@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles = this.reflector.get<string[]>(
      META_ROLES,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();

    const user = req.user as User;
    
    if (!user) throw new BadRequestException('User not found');


    if (!validRoles.includes(user.role)) throw new ForbiddenException('access denied');

    return true;
  }
}
