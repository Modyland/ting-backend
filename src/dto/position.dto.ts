import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsNumber,IsOptional,IsString } from "class-validator";
import { Double,Int32 } from "typeorm";

export class PositionDTO{    

    @IsString()
    @ApiProperty({type:String, description:''})
    readonly kind:string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({type:Number, description:''})
    readonly useridx:number;   

    @IsString()
    @ApiProperty({type:String, description:''})
    readonly id:string;

    @IsString()
    @IsOptional()
    @ApiProperty({type:String, description:''})
    readonly writetime:string;   

    @IsString()
    @IsOptional()
    @ApiProperty({type:String, description:''})
    readonly renewtime:string;   

    @IsNumber()
    @IsOptional()
    @ApiProperty({type:Number, description:''})
    readonly latitude:number;

    @IsNumber()
    @IsOptional()    
    @ApiProperty({type:Number, description:''})
    readonly longitude:number;    

    @IsString()
    @IsOptional()
    @ApiProperty({type:String, description:''})
    readonly address:string;
}