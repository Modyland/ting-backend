import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login_logEntity } from 'src/entity/login_log.entity';
import { JwtAccessStrategy } from 'src/jwt/jwtAccessStrategy';
import { Login_logDTO } from 'src/dto/Login_log.dto';

@Injectable()
export class Login_logService { 
  constructor(@InjectRepository(Login_logEntity) private login_logRepository:Repository<Login_logEntity>){}
 
  async LogInsert(body:Login_logDTO): Promise<any>{   
    var boolResult = false
    try{        
        const result = await this.login_logRepository.createQueryBuilder()
                        .insert()
                        .into(Login_logEntity)
                        .values([{
                            id:body.id,writetime:body.writetime,activity:body.activity
                        }])
                        .execute()
        boolResult = true
        var jsonValue = 'result = ' + boolResult.toString()
        console.log('app_log - insert')
        return jsonValue;
    }catch(E){
        console.log(E)
        return E;
    }
  }  
}