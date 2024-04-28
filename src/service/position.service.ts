import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PositionEntity, UserPositionEntity } from 'src/entity/user_position.entity';
import { PositionDTO } from 'src/dto/position.dto';

@Injectable()
export class PositionService {  
  constructor(
    @InjectRepository(PositionEntity) private parentsRepository:Repository<PositionEntity>,
    @InjectRepository(UserPositionEntity) private userParentsRepository:Repository<UserPositionEntity>,
    ){}

  async funcKind(body:PositionDTO): Promise<any>{
    switch(body.kind){
      case"insert":
        return await this.InsertPosition(body)
      default:
        return false
    }
  }
  

  async InsertPosition(body:PositionDTO): Promise<any>{    
    try{      
        let boolResult = false                
        const result = await this.parentsRepository.createQueryBuilder()
                        .insert()
                        .into(PositionEntity)
                        .values([{id:body.id,writetime:body.writetime,latitude:body.latitude,longitude:body.longitude,address:body.address}])
                        .execute()
        await this.UserPositionUpdate(body)
        if(body.address != null){
          await this.UserPositionUpdateAddress(body.id,body.address)
        }
        console.log(`position insert`)        
        boolResult = true
        return boolResult ? boolResult?.toString() : {msg:0};
    }catch(E){    
        console.log(E)
        return {msg:E};
    }
  }

  async InsertUserPosition(body:PositionDTO): Promise<boolean>{    
    try{      
        let boolResult = false                
        const result = await this.userParentsRepository.createQueryBuilder()
                        .insert()
                        .into(UserPositionEntity)
                        .values([{useridx:body.useridx,id:body.id,writetime:body.writetime,latitude:body.latitude,longitude:body.longitude,address:body.address}])
                        .execute()                        
        console.log(`position insert`) 
        boolResult = true                   
        return boolResult;
    }catch(E){    
        console.log(E)
        return false;
    }
  }
 

  async UserPositionUpdate(body:PositionDTO):Promise<boolean>{
    try{      
      const result = await this.parentsRepository.createQueryBuilder()
                          .update(UserPositionEntity)
                          .set({writetime:body.writetime,latitude:body.latitude,longitude:body.longitude})
                          .where({"id":body.id})
                          .execute()             
      return true;
    }catch(E){
      console.log(E)
      return false;
    } 
  }

  async UserPositionUpdateAddress(id:string,address:string):Promise<boolean>{
    try{      
      const result = await this.parentsRepository.createQueryBuilder()
                          .update(UserPositionEntity)
                          .set({address:address})
                          .where({"id":id})
                          .execute()             
      return true;
    }catch(E){
      console.log(E)
      return false;
    } 
  }

  async UserPositionUpdateRenewDate(id:string,renewtime:string):Promise<boolean>{
    try{      
      const result = await this.parentsRepository.createQueryBuilder()
                          .update(UserPositionEntity)
                          .set({renewtime:renewtime})
                          .where({"id":id})
                          .execute()             
      return true;
    }catch(E){
      console.log(E)
      return false;
    } 
  }
  
  async GetUserPosition(id:string,latitude:number,longitude:number):Promise<string>{
    await this.userParentsRepository.createQueryBuilder()
    .select('latitude,longitude')
    return ""
  }

  async UserPositionSubQuery():Promise<string>{
    try{
      const query = await this.userParentsRepository.createQueryBuilder()
                    .subQuery()
                    .select('')
                    .from(UserPositionEntity,'')
                    .getQuery()
      return query
    }catch(E){
      return ''
    }
  }
}

