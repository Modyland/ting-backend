import { Transform, Type } from "class-transformer";
import { IsArray, IsNumber,IsOptional,IsString } from "class-validator";
import { Double,Int32 } from "typeorm";

export class positionDTO{    
    
    @IsString()
    @IsOptional()
    readonly kind:string;

    @IsString()
    readonly id:string;

    @IsString()
    readonly writetime:string;   

    @IsString()
    @IsOptional()
    readonly latitude:number;

    @IsArray()
    @IsOptional()    
    readonly longitude:number;    

    @IsString()
    @IsOptional()
    readonly address:string;
}