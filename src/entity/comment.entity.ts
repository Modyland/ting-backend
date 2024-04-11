import { Entity, Column, PrimaryGeneratedColumn, Double, Int32 } from 'typeorm';

@Entity('nbo_comment')
export class commentEntity{

    @PrimaryGeneratedColumn()
    idx: number;

    @Column({type:'varchar'})
    id:string;

    @Column({type:'datetime'})
    writetime:string;      

    @Column({type:'int'})
    postNum:Int32;
    
    @Column({type:'varchar'})
    aka:string;
}