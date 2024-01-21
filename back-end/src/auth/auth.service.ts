import { Injectable,UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly PrismaService: PrismaService,
    private readonly jwtService: JwtService,
    ) {}

  async create(createUserDto: CreateUserDto) {
    
    const password = bcrypt.hashSync(createUserDto.password, 10);
    try {
      
      const user = await this.PrismaService.user.create({
        data: {
          ...createUserDto,
          password,
        },
        select: {
          id: true,
          email: true,
        },
      });
      return{
        token:this.getJwtToken({
          email: user.email,
          id: user.id,
        })
      } 
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid credentials')
    }
  }

  async login(loginUserDto:LoginUserDto) {
    
    const user = await this.PrismaService.user.findUnique({
      where: {
        email: loginUserDto.email,
      }
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = bcrypt.compareSync(loginUserDto.password,user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
    
    return{
      token:this.getJwtToken({
        email: user.email,
        id: user.id,
      })
    } 
  }

  private getJwtToken(payload: JwtPayload) {
      return this.jwtService.sign(payload);
  }
}
