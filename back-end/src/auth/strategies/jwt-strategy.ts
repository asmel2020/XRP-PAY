import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interfaces';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      secretOrKey: configService.get<string>('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
      select:{
        id: true,
        email: true,
        isActive: true,
        role: true,
      }
    });

    if (!user) throw new UnauthorizedException('Token not valid');

    if (!user.isActive)
      throw new UnauthorizedException('User is inactive, talk with an admin');

    return user;
  }
}
