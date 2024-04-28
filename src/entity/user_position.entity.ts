import { Entity, Column, PrimaryGeneratedColumn, Double, Int32 } from 'typeorm';

@Entity('user_position')
export class UserPositionEntity{

    @PrimaryGeneratedColumn()
    idx: number;
    @Column({type:'int'})
    useridx: number;

    @Column({type:'varchar'})
    id:string;

    @Column({type:'datetime'})
    writetime:string;

    @Column({type:'datetime'})
    renewtime:string;

    @Column({type:'float'})
    latitude:number;

    @Column({type:'float'})
    longitude:number;

    @Column({type:'varchar'})
    address:string;    
}

@Entity('position')
export class PositionEntity{

    @PrimaryGeneratedColumn()
    idx: number;

    @Column({type:'varchar'})
    id:string;

    @Column({type:'datetime'})
    writetime:string;

    @Column({type:'float'})
    latitude:number;

    @Column({type:'float'})
    longitude:number;

    @Column({type:'varchar'})
    address:string;    
}