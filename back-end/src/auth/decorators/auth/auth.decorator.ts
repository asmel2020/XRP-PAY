import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from '../../interfaces';
import { RoleProtected } from '../';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../../guards';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(),UserRoleGuard)
  ); 
}