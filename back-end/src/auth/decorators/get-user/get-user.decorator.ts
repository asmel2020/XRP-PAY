import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  const user = req.user;

  delete user.password;
  
  if (!user) throw new InternalServerErrorException('User not found');

  return user;
});
