import { IsNumber,IsOptional,IsString,IsArray } from "class-validator";
import { Double,Int32 } from "typeorm";

export class userDTO{
    
    @IsOptional()
    @IsString()
    readonly kind: string;
    
    @IsString()
    readonly id:string;

    @IsOptional()
    @IsString()
    readonly pwd:string;
    
    @IsOptional()
    @IsString()
    readonly phone:string;

    @IsOptional()
    @IsString()
    readonly birth:string;

    @IsOptional()
    @IsString()
    readonly gender:string;    

    @IsOptional()
    @IsString()
    readonly signupdate:string;

    @IsOptional()
    @IsString()
    readonly writetime:string;

    @IsOptional()
    @IsNumber()
    readonly pause:number;

    @IsOptional()
    @IsArray()
    readonly profile:number[];

    @IsOptional()
    @IsString()
    readonly aka:string;

    @IsOptional()
    @IsNumber()
    readonly guard:string;

    @IsOptional()
    @IsString()
    access_token:string;   
    
    @IsOptional()
    @IsString()
    refresh_token:string; 

    @IsOptional()
    @IsString()
    alarm_token:string;  
}