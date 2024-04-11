import { IsArray, IsNumber,IsOptional,IsString } from "class-validator";


export class nboImgDTO{

    @IsString()
    @IsOptional()
    readonly kind: string;

    @IsNumber()
    @IsOptional()
    readonly idx: number;
    
    @IsString()    
    readonly id:string;    
    
    @IsNumber()
    @IsOptional()
    readonly nboidx:number;  

    @IsString()
    @IsOptional()
    readonly writetime:string; 

    @IsArray()
    @IsOptional()
    readonly nboImg:Buffer;

        
}