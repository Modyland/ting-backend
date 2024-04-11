import { IsNumber,IsOptional,IsString } from "class-validator";


export class appversionDTO{   
    @IsString()    
    readonly admin:string;

    @IsOptional()    
    @IsString()
    readonly appversion:string;
}