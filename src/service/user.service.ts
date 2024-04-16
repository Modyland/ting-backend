import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userDTO } from '../dto/user.dto';
import { commonFun } from 'src/clsfunc/commonfunc';
import { DelUserLogEntity, userEntity } from 'src/entity/user.entity';
import { pwBcrypt } from 'src/clsfunc/pwAES';
import { Login_logService } from './login_log.service';
import { Login_logDTO } from 'src/dto/Login_log.dto';


@Injectable()
export class userService {  
  constructor(
  @InjectRepository(userEntity) private userRepository:Repository<userEntity>,    
  @InjectRepository(DelUserLogEntity) private DeleteUserLogRepository:Repository<DelUserLogEntity>,  
  private login_logService:Login_logService
  ){}
  

  async gubunKind(body:userDTO): Promise<string>{   
    switch(body.kind){
        case "idDupe" :
            return await this.checkIDDupe(body.id);
        case "login" :
             return await this.Login(body);        
        case "signUp" :
            return await this.signUp(body);
        case "profileUpdate" :
            return await this.profileUpdate(body)
        case "updatePWD" :
            return await this.updatePWD(body);        
        case "deleteUser" :
             return await this.userDelete(body);
        case "updateLoginCheck" :
            return await this.updateLogin_out(body);
        case "findID":
            return await this.getID(body);
        case "profile":
            return await this.getProfile(body.id);
        case null  :
            return false.toString();

    } 
    
  }  

  async findByFields(id:string,phone:string):Promise<userEntity>{
    try{
      const result:userEntity = await this.userRepository.createQueryBuilder()
                      .select("*")
                      .where({"id":id})
                      .andWhere({"phone":phone})
                      .getRawOne()
      return result
    }catch(E){
      console.log(E)
    }
  }

  async userDelete(body:userDTO):Promise<string>{
    try{
        var info = await this.getUserDelete_Info(body.id)
        if(!info){
          let bool = await this.setInsert(this.DeleteUserLogRepository,DelUserLogEntity,body);
          if(bool)
          {         
              return await this.setDelete(body.id)            
          }else{
              return false.toString();
          }
        }
    }catch(E){
        console.log(E)
        return false.toString();
    }
  }  

  async setDelete(id:string):Promise<string>{
        try{
            const result = await this.userRepository.createQueryBuilder()
                                    .delete()                                    
                                    .where({"id":id})
                                    .execute()
            return true.toString();
        }catch(E){
            console.log(E)
            return false.toString();
        }
  }

  async getUserDelete_Info(id:string):Promise<any>{
    try{
        const result:userEntity = await this.userRepository.createQueryBuilder()
                      .select('*')                                    
                      .where({"id":id})
                      .getRawOne()
        return result;
    }catch(E){
        console.log(E)
        return false;
    }
  }

  async profileUpdate(body:userDTO): Promise<string>{
    try{        
        var boolResult = false
        const result = await this.userRepository.createQueryBuilder()
                        .update(userEntity)        
                        .set({
                            "profile":body.profile
                        })
                        .where({"id":body.id})
                        .execute()
        boolResult = true
        console.log('setProfile')
        return boolResult.toString();
    }catch(E){
        console.log('profileUpdate' + E)
        return false.toString();
    }
  }

  async getID(body:userDTO): Promise<string>{    
    try{          
        
        const result:userEntity = await this.userRepository.createQueryBuilder()
                                .select('id')
                                .where({"id":body.id})
                                .getRawOne()                                
        return result.id;
    }catch(E){
        console.log(E)        
    }  
    
  }

  async signUp(body:userDTO):Promise<string>{
    try{      
      return await this.setInsert(this.userRepository,userEntity,body).toString()
    }catch(E){
      console.log('signUp' + E)
      return false.toString();      
    }
  }

  async setInsert(repository:any,entity:any,body:userDTO):Promise<boolean>{
    try{        
        const AESpwd = await pwBcrypt.transformPassword(body.pwd)
        const result = await repository.createQueryBuilder()
                            .insert()
                            .into(entity)
                            .values([{
                                id:body.id,phone:body.phone,password:AESpwd,
                                birth:body.birth,gender:body.gender,signupdate:body.signupdate,
                                pause:body.pause,profile:body.profile,aka:body.aka,guard:0,
                                access_token:body.access_token,refresh_token:body.refresh_token,alarm_token:body.alarm_token
                            }])
                            .execute()
        console.log('setInsert user')        
        return true
    }catch(E){
        console.log('setInsert : ' + E)
        return false
    }    
  } 

  async getProfile(id:string): Promise<string>{
    try{
       const result:userEntity = await this.userRepository.createQueryBuilder()
                                  .select('id,phone,birth,gender,profile,aka,access_token')
                                  .where({"id":id})
                                  .getRawOne()
      return commonFun.converterJson(result)
    }catch(E){
      console.log("getProfile" + E)
      return false.toString();
    }   
      
  } 

  async CheckLogin(body:userDTO): Promise<boolean>{
      try{
          const result:userEntity = await this.userRepository.createQueryBuilder('')
                                    .select('pwd')
                                    .where({"id":body.id})
                                    .andWhere({"guard":0})
                                    .getRawOne()
          var bool = await pwBcrypt.validatePwd(body.pwd,result.pwd); 
          console.log('CheckLogin')                  
          return bool;
      }catch(E){
          console.log('CheckLogin : ' + E)
      }
  }

  async Login(body:userDTO) : Promise<string>{
    try{
      var bool = false
      var checkLogin = await this.CheckLogin(body)
      if (checkLogin){
        bool = await this.UpdateLogin(body.id);
        var logModel:Login_logDTO = {id:body.id,writetime:body.writetime,activity:"로그인"}
        await this.login_logService.LogInsert(logModel);
      }
      return bool.toString();
    }catch(E){
      console.log('Login : ' + E)
    }
  }

  async UpdateLogin(id:string): Promise<boolean>{
   try{
        await this.userRepository.createQueryBuilder()
        .update(userEntity)
        .set({guard:1})
        .where({"id":id})
        .execute()        
        return true;
   }catch(E){
        console.log('UpdateLogin : ' + E)
        return false;
   }    
  }
    
    async updateLogin_out(body:userDTO):Promise<string>{
        try{
            const result = await this.userRepository.createQueryBuilder()
                                            .update(userEntity)        
                                            .set({ "guard":body.guard})
                                            .where({"id":body.id})
                                            .execute()                                            
            return true.toString();
        }catch(E){
            console.log(E)
            return false.toString();
        }
    }
  
  async checkIDDupe(id:string): Promise<string>{
    try{
      var boolResult = false
      if(isDefined(id)){
          const result: userEntity[] = await this.userRepository.createQueryBuilder('user')
                                                  .select('eq')    
                                                  .where({"eq":id})    
                                                  .getRawMany()
          if(result.length == 0){        
              const rs = await this.DeleteUserLogRepository.createQueryBuilder()
                          .select('id')
                          .where({"id":id})
                          .getRawMany()
              if(rs.length == 0)
                  boolResult = true        
          }  
      }    
      console.log('checkIDDupe')
      return boolResult.toString();
    }catch(E){
      console.log('checkIDDupe : ' + E)
    }
   }

    async updatePWD(body:userDTO): Promise<string>{
      try{        
            var boolResult = false
            const AESpwd = await pwBcrypt.transformPassword(body.pwd)
            const result = await this.userRepository.createQueryBuilder()
                                        .update(userEntity)        
                                        .set({ "pwd":AESpwd})
                                        .where({"id":body.id})
                                        .execute()
            boolResult = true            
            console.log('updatePWD')
            return boolResult.toString();
        }catch(E){
            console.log('updatePWD : ' + E)
            return false.toString();
        }             
    }    
}

