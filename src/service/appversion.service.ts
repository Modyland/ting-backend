import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { commonFun } from 'src/clsfunc/commonfunc';
import { appversionDTO } from 'src/dto/appversion.dto';
import { appversionEntity } from 'src/entity/appversion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class appversionService {  
  constructor(@InjectRepository(appversionEntity) private appversionRepository:Repository<appversionEntity>
  ){}
  
  async getVersion(admin:string): Promise<string>{
    try{      
      const result = await this.appversionRepository.createQueryBuilder()
                      .select('appversion')                      
                      .where({"admin":admin})
                      .getRawOne()        
      return commonFun.converterJson(result);                    
    }catch(E){
      console.log(E)
    }
  }

  async updateVersion(body:appversionDTO): Promise<string>{    
    try{           
        const result = await this.appversionRepository.createQueryBuilder()
        .update(appversionEntity)        
        .set({
          "appversion":body.appversion
        })
        .where({"admin":body.admin})        
        .execute()            
        return true.toString();
    }catch(E){
        console.log(E)
        return false.toString();
    }             
  }

}