import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { positionService } from 'src/service/position.service';
import { positionDTO } from '../dto/parents.dto';
import { staticConfigValue } from 'src/config/staticConfigValue';
//import { ConfigService } from '@nestjs/config';

@Controller('position')
@ApiTags('position')
export class positionController {
  constructor(private readonly positionService: positionService,
    //private configService:ConfigService
    ) {}  

  @Post("/api_getdata")
 async postAll(    
   @Body() body: positionDTO): Promise<string> {     
    // return await this.positionService.postParent(body);
    return ''
  }
  @Get("/getTest")
 async getAll(@Query('eq') eq: string[]): Promise<boolean> {            
    return true;   
  }

  @Get("/Test")
 async post(): Promise<string> {      
  //let path = staticConfigValue.getFirebase_sdk(this.configService).path
  //  console.log(path)        
   // return path;   
   return '';
  }
}