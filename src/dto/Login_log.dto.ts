import { IsNumber,IsOptional,IsString } from "class-validator";
import { Double,Int32 } from "typeorm";

export class Login_logDTO{
    @IsString()
    @IsOptional()
    readonly id: string;
    
    @IsString()
    readonly writetime:string;

    @IsString()
    @IsOptional()
    readonly activity:string;
}