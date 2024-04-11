import { IsNumber,IsOptional,IsString } from "class-validator";
import { Double,Int32 } from "typeorm";

export class nboDTO{
    @IsString()
    @IsOptional()
    readonly kind: string;
    
    @IsString()
    readonly id:string;

    @IsString()
    readonly writetime:string;

    @IsString()
    @IsOptional()
    readonly aka:string;
}