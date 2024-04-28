import { MoreThanOrEqual,LessThan,LessThanOrEqual,Repository } from 'typeorm';
import { commonFun } from './commonfunc';
import { UserEntity } from 'src/entity/user.entity';
import { PositionDTO } from 'src/dto/position.dto';
import { UserPositionEntity } from 'src/entity/user_position.entity';

export class commonQuery{
    static async UpdateGuard(userRepository:Repository<UserEntity>,id:string,activate:string,guard:number): Promise<boolean>{
        try{         
             await userRepository.createQueryBuilder()
             .update(UserEntity)
             .set({guard:guard,activate:activate})        
             .where({"id":id})
             .execute()        
             return true;
        }catch(E){
             console.log('UpdateLogin : ' + E)
             return false;
        }    
    }

    

    static async getProfile(Repository:any,parentsEntity:any,empid:string,bool=false):Promise<string>{
        let boolResult = false
        try{
            let select = 'a.eq,a.eqname,a.email,a.phone as userphone,a.sex,a.height,a.weight,a.age,a.birth,a.signupdate,'+
            'a.sleeptime,a.uptime,a.bpm,a.step,a.distanceKM,a.calexe,' +
            'a.cal,a.alarm_sms,a.differtime,b.phone'
            let result
            if(bool){
                result = await Repository.createQueryBuilder('a')        
                .select(select)    
                .leftJoin(parentsEntity,'b','a.eq = b.eq')    
                .where({"eq":empid})    
                .getRawOne()    
            }else{
                result = await Repository.createQueryBuilder('a')        
                .select(select)    
                .leftJoin(parentsEntity,'b','a.eq = b.eq')    
                .where({"eq":empid})    
                .getRawMany()    
            }
        console.log(result)
        const jsonValue = (result.length != 0 && empid != null)? result : 'result = ' + boolResult.toString()     
        return commonFun.converterJson(jsonValue);
        }catch(E){
            console.log(E)
        }
    }

}