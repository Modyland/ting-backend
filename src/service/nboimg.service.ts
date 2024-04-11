import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nboImgEntity } from "src/entity/profileLog.entity";
import { nboImgDTO } from "src/dto/nboimg.dto";
import { commonFun } from 'src/clsfunc/commonfunc';


@Injectable()
export class NboImgService {  
  constructor(@InjectRepository(nboImgEntity) private nboImgRepository:Repository<nboImgEntity>,
  ){}

  async InsertImg (body:nboImgDTO): Promise<string>{
    try{          
      await this.nboImgRepository.createQueryBuilder()
              .insert()
              .into(nboImgEntity)
              .values([{
                  id:body.id,nboidx:body.nboidx,nboImg:body.nboImg,writetime:body.writetime
              }])
              .execute()
        console.log('InsertImg')        
        return true.toString();
    }catch(E){
        console.log('InsertImg : ' + E) 
        return false.toString();
    } 
  }

  async updateLast(body:nboImgDTO): Promise<string>{    
        try{        
            const result = await this.nboImgRepository.createQueryBuilder()
            .update(nboImgEntity)        
            .set({ "nboImg":body.nboImg,"writetime":body.writetime})
            .where({"id":body.id})
            .andWhere({"nboidx":body.nboidx})
            .execute()        
            console.log('updateLast')
            return true.toString();
        }catch(E){
            //console.log(E) 대기열 문제 가끔 발생
            return false.toString();
        }             
}

  async getImg (id:string,nboidx:number): Promise<string>{        
    try{
       const result = await this.nboImgRepository.createQueryBuilder()
                            .select('nboImg')                                
                            .where({"id":id})
                            .andWhere({"nboidx":nboidx})
                            .getRawMany()      
      console.log("getImg")                                                          
      return commonFun.converterJson(result);    
    } catch(E){
        console.log('getImg : ' + E)
        return false.toString();
    }                 
  
 }
}


