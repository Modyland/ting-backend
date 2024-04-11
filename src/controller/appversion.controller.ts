import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { appversionDTO } from 'src/dto/appversion.dto';
import { appversionService } from 'src/service/appversion.service';

@Controller('appversion')
@ApiTags('appversion')
export class appversionController {
  constructor(private readonly appversionService: appversionService) {}  

  @Post("/api_getdata")
 async api_getdata(    
   @Body() body: appversionDTO): Promise<string> {        
    return await this.appversionService.updateVersion(body);
  }

  @Get("/getVersion")
 async getVersion(       
   @Query('admin') admin:string
   ): Promise<string> {       
    return await this.appversionService.getVersion(admin);
  }
}