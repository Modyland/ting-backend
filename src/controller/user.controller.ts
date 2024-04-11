import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { userDTO } from '../dto/user.dto';
import { userService } from 'src/service/user.service';

@Controller('ting')
@ApiTags('ting')
export class userController {
  constructor(private readonly userService: userService) {}  

  @Post("/api_getdata")
 async postAll(    
   @Body() body: userDTO): Promise<string> {        
    return await this.userService.gubunKind(body);
  } 

  @Get("/getProfile")
 async getProfile(       
   @Query('id') id:string): Promise<string> {       
    return await this.userService.getProfile(id);
  }

//   @Get("/findID")
//  async getFindID(       
//    @Query('성명') name:string,
//    @Query('핸드폰') phone:string,
//    @Query('생년월일') birth:string): Promise<string> {       
//     return await this.인원_목록Service.findID(name,phone,birth);
//   }

//   @Get("/Profile")
//  async getProfile(       
//    @Query('empid') empid:string): Promise<string> {     
//     return await this.인원_목록Service.getProfile(empid);
//   }

//   @Get("/CheckLogin")
//  async getCheckLogin(       
//    @Query('empid') empid:string,
//    @Query('pw') pw:string,
//    @Query('phone') phone:string,
//    @Query('token') token:string,
//    @Query('destroy') destroy:boolean
//    ): Promise<string> {          
//     return await this.인원_목록Service.checkLogin(empid,pw,phone,token,destroy);
//   }  

//   @Get("/test")
//  async getTest(       
//    @Query('empid') empid:string): Promise<any> {
//      return await this.인원_목록Service.setLastLogInsert(empid);     
//     }

//     @Post("/postTest")
//  async postTest(    
//    @Body() body: 인원_목록DTO): Promise<any> {        
//     return await this.인원_목록Service.lastDelete(body.eq);
//   }     
}