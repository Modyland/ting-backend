import { Entity, Column, PrimaryGeneratedColumn, Double, Int32} from 'typeorm';

@Entity('user')
export class userEntity{

    @PrimaryGeneratedColumn()
    idx: number;

    @Column({type:'varchar'})
    id:string;

    @Column({type:'varchar'})
    phone:string;

    @Column({type:'varchar'})
    pwd:string;

    @Column({type:'date'})
    birth:string;

    @Column({type:'varchar'})
    gender:string;
    
    @Column({type:'datetime'})
    signupdate:string;

    @Column({type:'tinyint'})
    pause:string;

    @Column({type:'blob'})
    profile:Buffer;   
    
    @Column({type:'varchar'})
    aka:string; 

    @Column({type:'tinyint'})
    guard:Int32;

    @Column({type:'varchar'})
    access_token:string;   
    
    @Column({type:'varchar'})
    refresh_token:string; 

    @Column({type:'varchar'})
    alarm_token:string;      
    
}

@Entity('del_user_log')
export class DelUserLogEntity{

    @PrimaryGeneratedColumn()
    idx: number;

    @Column({type:'varchar'})
    id:string;

    @Column({type:'varchar'})
    phone:string;

    @Column({type:'varchar'})
    pwd:string;

    @Column({type:'date'})
    birth:string;

    @Column({type:'varchar'})
    gender:string;
    
    @Column({type:'datetime'})
    signupdate:string;

    @Column({type:'tinyint'})
    pause:string;

    @Column({type:'varchar'})
    profile:string;  

    @Column({type:'varchar'})
    aka:string;

    @Column({type:'varchar'})
    access_token:string;   
    
    @Column({type:'varchar'})
    refresh_token:string; 

    @Column({type:'varchar'})
    alarm_token:string;  
}