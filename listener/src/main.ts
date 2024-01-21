import { NestFactory, } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlockMonitModule } from './block-monit/block-monit.module';
import { BlockMonitService } from './block-monit/block-monit.service';
import { delay } from './common/utils/delay';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);


  let configService=app.get(ConfigService);
  let blockMonitService=app.get(BlockMonitService);
  
  const eject = (provider:string)=>{
    blockMonitService.onBlock(provider)
    .then((res)=>{}) 
    .catch(async (err)=>{
      await delay(10000)
      eject(provider);
    });
  }
  
  eject(configService.get('web3.provider'));
}
bootstrap();
