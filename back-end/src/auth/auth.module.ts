import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule,} from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategy';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: configService.get('jwt.expireIn') },
      }),
    }),PrismaModule
  ],
  providers: [AuthService,JwtStrategy],
  exports: [PassportModule, JwtModule,JwtStrategy],
})
export class AuthModule {}
