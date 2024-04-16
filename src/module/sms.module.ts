import {Module } from '@nestjs/common';
import {CacheModule} from '@nestjs/cache-manager';
import {SmsService} from '../service/sms.service';
import { DelUserLogEntity, userEntity } from 'src/entity/user.entity';
import { smsController } from 'src/controller/sms.controller';
import { smsEntity } from 'src/entity/sms.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userService } from 'src/service/user.service';
import { Login_logService } from 'src/service/login_log.service';
import { Login_logEntity } from 'src/entity/login_log.entity';
import { CachConfigService } from 'src/service/cache.service';
 


@Module({
  imports: [
    TypeOrmModule.forFeature([smsEntity,userEntity,DelUserLogEntity,Login_logEntity]), 
    CacheModule.registerAsync({isGlobal:true, useClass:CachConfigService,inject:[CachConfigService]})
  ],
  providers: [
    SmsService,
    userService,
    Login_logService
  ],
    controllers:[smsController]
})
export class smsModule {}
