import { Entity, Column, PrimaryGeneratedColumn, Double, Int32 } from 'typeorm';

@Entity('nbo')
export class nboEntity{

    @PrimaryGeneratedColumn()
    idx: number;

    @Column({type:'varchar'})
    id:string;         

    @Column({type:'datetime'})
    writetime:string;

    @Column({type:'varchar'})
    aka:string; 
}