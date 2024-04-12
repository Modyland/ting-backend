import { ApiProperty } from "@nestjs/swagger";
import { IsNumber,IsOptional,IsString,IsArray } from "class-validator";
import { Double,Int32 } from "typeorm";

export class userDTO{
    
    @IsOptional()
    @IsString()
    @ApiProperty({type:String, description:'post 구분 값'})
    readonly kind: string;
    
    @IsString()
    @ApiProperty({type:String, description:''})
    readonly id:string;

    @IsOptional()
    @IsString()
    @ApiProperty({type:String, description:''})
    readonly pwd:string;
    
    @IsOptional()
    @IsString()
    @ApiProperty({type:String, description:''})
    readonly phone:string;

    @IsOptional()
    @IsString()
    @ApiProperty({type:String, description:''})
    readonly birth:string;

    @IsOptional()
    @IsString()
    @ApiProperty({type:String, description:''})
    readonly gender:string;    

    @IsOptional()
    @IsString()
    @ApiProperty({type:String, description:''})
    readonly signupdate:string;

    @IsOptional()
    @IsString()
    @ApiProperty({type:String, description:''})
    readonly writetime:string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({type:Number, description:''})
    readonly pause:number;

    @IsOptional()
    @IsArray()
    @ApiProperty({type:Buffer, description:''})
    readonly profile:Buffer;

    @IsOptional()
    @IsString()
    @ApiProperty({type:String, description:'닉네임'})
    readonly aka:string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({type:String, description:''})
    readonly guard:string;

    @IsOptional()
    @IsString()
    @ApiProperty({type:String, description:''})
    access_token:string;   
    
    @IsOptional()
    @IsString()
    @ApiProperty({type:String, description:''})
    refresh_token:string; 

    @IsOptional()
    @IsString()
    @ApiProperty({type:String, description:'firebase'})
    alarm_token:string;  
}