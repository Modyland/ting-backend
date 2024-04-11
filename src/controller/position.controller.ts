import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { positionService } from 'src/service/position.service';

@Controller('position')
@ApiTags('position')
export class positionController {
  constructor(private readonly positionService: positionService,    
    ) {}  

  @Post("/api_getdata")
 async postAll(    
   @Body() body: positionDTO): Promise<string> {         
    return ''
  }
  @Get("/getTest")
 async getAll(@Query('eq') eq: string[]): Promise<boolean> {            
    return true;   
  }

  @Get("/Test")
 async post(): Promise<string> {        
   return '';
  }
}