import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { positionEntity } from 'src/entity/user_position.entity';

@Injectable()
export class positionService {  
  constructor(
    @InjectRepository(positionEntity) private parentsRepository:Repository<positionEntity>){}  

 
     
}

