import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsNumber,IsOptional,IsString } from "class-validator";
import { Double,Int32 } from "typeorm";

export class positionDTO{    
    
    @IsString()
    @IsOptional()
    @ApiProperty({type:String, description:'post 구분 값'})
    readonly kind:string;

    @IsString()
    @ApiProperty({type:String, description:''})
    readonly id:string;

    @IsString()
    @ApiProperty({type:String, description:''})
    readonly writetime:string;   

    @IsString()
    @IsOptional()
    @ApiProperty({type:Number, description:''})
    readonly latitude:number;

    @IsArray()
    @IsOptional()    
    @ApiProperty({type:Number, description:''})
    readonly longitude:number;    

    @IsString()
    @IsOptional()
    @ApiProperty({type:String, description:''})
    readonly address:string;
}