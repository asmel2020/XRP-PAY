import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth, GetUser } from '../auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { WithdrawalUserDto } from './dto/withdrawal-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('withdrawal')
  @Auth(ValidRoles.USER, ValidRoles.ADMIN)
  withdrawal(
    @Body() withdrawalUserDto: WithdrawalUserDto,
    @GetUser() { id }: any,
  ) {
    return this.usersService.withdrawal(withdrawalUserDto, id);
  }

  @Get()
  @Auth(ValidRoles.USER, ValidRoles.ADMIN)
  findAll(@GetUser() { id }: any) {
    return this.usersService.find(id);
  }
}
