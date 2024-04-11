import { IsNumber,IsOptional,IsString } from "class-validator";

export class commentDTO{
    @IsString()
    @IsOptional()
    readonly kind: string;

    @IsString()    
    readonly id:string;

    @IsString()
    @IsOptional()
    readonly writetime:string;
    
    @IsString()    
    readonly postNum:number;       
    
    @IsString()    
    @IsOptional()
    readonly aka:string;
}