import { isDefined } from 'class-validator';

 export class commonFun{
       
   static converterJson(result:any){        
        return JSON.stringify(result);
    }   
    
}