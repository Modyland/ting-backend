import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SmsService } from 'src/service/sms.service';

@Controller('SMS')
@ApiTags('SMS')
export class smsController {
  constructor(
    private readonly smsService: SmsService,    
    ) {}  

  @Post("/api_getdata")
 async postAll(    
   @Body() body: any) {     
    // return await this.smsService.sendSms(body);
  }
  @Get("/sendSMS")
 async getSendSMS(
    @Query('id') id:string,  
    @Query('phone') phone: string
    ): Promise<boolean> {            
    return await this.smsService.sendSms(id,phone);   
  }

  @Get("/checkSMS")
 async getCheckSMS(
    @Query('phone') phone: string,
    @Query('code') code: number
    ): Promise<boolean> {            
    return await this.smsService.checkSMS(phone,code);   
  }

  @Get("/Test")
 async getTest(
    @Query('id') id:string,    
    @Query('phone') phone:string
 ): Promise<any> { 
  console.log(phone)
   return await this.smsService.sendSms(id,phone);
  }

  @Get("/countTest")
 async postTest(@Query('phone') phone:string): Promise<boolean> { 
   return await this.smsService.checkDayCount(phone);
  }
}