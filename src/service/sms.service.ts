import {    
    HttpStatus,
    Inject,
    Injectable,    
    UseInterceptors,
    } from '@nestjs/common';
import { CacheInterceptor,CACHE_MANAGER } from '@nestjs/cache-manager';
import * as crypto from 'crypto';    
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios'
import { userEntity } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository,Like} from 'typeorm';
import { smsEntity } from 'src/entity/sms.entity';
import * as dayjs from 'dayjs';


@Injectable()
@UseInterceptors(CacheInterceptor)    
export class SmsService{
    constructor(
        @InjectRepository(smsEntity) private smsRepository:Repository<smsEntity>,
        @InjectRepository(userEntity) private userRepository:Repository<userEntity>,        
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly config: ConfigService, // .env
      ) {}

      accessKey = this.config.get('NAVER_ACCESSKEY')      

      getUrl = () => {
        const naver_ID = this.config.get('NAVER_SERVICEID')        
        return `/sms/v2/services/${naver_ID}/messages`
      }

      // SMS 인증 위한 시그니쳐 생성 로직
      makeSignatureForSMS = (time:string):string => {
        const secretKey:string = this.config.get('NAVER_SECRETKEY')        
        let message = []
        const hmac = crypto.createHmac('sha256',secretKey)        
        const timeStamp = time;
        const space = " " 
        const newLine = "\n"
        const method = "POST"
        const url = this.getUrl()        
        message.push(method)
        message.push(space)
        message.push(url)
        message.push(newLine)
        message.push(timeStamp)
        message.push(newLine)
        message.push(this.accessKey)   

        const signature = hmac.update(message.join('')).digest('base64')     

        return signature.toString();
      }  

    checkDayCount = async (phoneNumber:string) : Promise<boolean> =>{
       try{
           let key: string = phoneNumber + 'smscount';
                   
           const dayCount:number = await this.smsCount(phoneNumber)

           console.log('sms 인증 횟수 ' + dayCount)
           if(dayCount > 5)
               return false;           
   
           return true;
       }catch(E){
            console.log(E)
            return false;
       }
    }

    smsCount = async (phoneNumber:string): Promise<number> => {
        try{
            const timeDay = dayjs(new Date()).format('YYYY-MM-DD')            
            const result = await this.smsRepository.createQueryBuilder()
                            .select('COUNT(*) AS count')
                            .where({"phone":phoneNumber})
                            .andWhere({"writetime":Like(`%${timeDay}%`)})
                            .getRawOne()            
            let {count} = result            
            if(count == undefined) count = 0
            return count            
        }catch(E){
            console.log(E)
            return 0;
        }
    }

    sendSms = async (id:string,phoneNumber:string):Promise<any> => {
        const writetime = Date.now().toString()

        if (!await this.checkDayCount(phoneNumber)) return '인증번호 하루 횟수 초과 하셨습니다.';

        const signature = this.makeSignatureForSMS(writetime);

        await this.cacheManager.del(phoneNumber);
        
        const checkNumber = this.makeOTP().toString().padStart(6,'0')

        const sendNumber:string = this.config.get('COMPANYNUMBER')

        const body = {
            type:'SMS',
            contentType: 'COMM',
            countryCode: '82',
            from: sendNumber,            
            content:`ting 어플 인증번호 [${checkNumber}] 입니다.`,              
            messages:[
                {                    
                    to:phoneNumber                    
                }
            ]
        }        

        console.log(body)        

       const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp':writetime,
            'x-ncp-iam-access-key':this.accessKey,
            'x-ncp-apigw-signature-v2':signature,            
        }

        const signatureUrl = this.getUrl()
        const url = `https://sens.apigw.ntruss.com${signatureUrl}`        
        try{            
            const result = await axios.post(                
                url,
                body,                   
                {headers},        
            ).then(async() => {
                await this.insertSMS(id,phoneNumber)
                await this.cacheManager.set(phoneNumber, checkNumber, 180000);
                return true;
            }).catch(
                (error) =>
                {
                console.log(HttpStatus.INTERNAL_SERVER_ERROR)
                console.log(error)
                return error
                })                 

            return result
        }catch(E){
            console.log(E)
            return E
        }
    }

    insertSMS = async (id:string,phoneNumber:string) => {
        try{
            const time = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss')
            const result = this.smsRepository.createQueryBuilder()
                            .insert()
                            .into(smsEntity)
                            .values([{id:id,phone:phoneNumber,writetime:time}])
                            .execute()
        }catch(E){
            console.log(E)
        }
    }

   checkSMS = async(phoneNumber: string,inputNumber:number): Promise<boolean> => {
        try{
            const sentNumber = (await this.cacheManager.get(phoneNumber)) as number;
            console.log('check sms code' +  typeof( inputNumber))
            if (sentNumber == inputNumber) return true;
            else return false;

        }catch(E){
            console.log(E)
            return false;
        }   
    }

    makeOTP = ():number => {
        const randNum = Math.floor(Math.random() * 1000000);
        return randNum;
    }

}