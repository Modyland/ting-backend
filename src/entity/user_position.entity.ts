import { Entity, Column, PrimaryGeneratedColumn, Double, Int32 } from 'typeorm';

@Entity('user_position')
export class positionEntity{

    @PrimaryGeneratedColumn()
    idx: number;

    @Column({type:'varchar'})
    id:string;

    @Column({type:'datetime'})
    writetime:string;

    @Column({type:'int'})
    latitude:Int32;

    @Column({type:'int'})
    longitude:Int32;

    @Column({type:'varchar'})
    address:string;
    
}