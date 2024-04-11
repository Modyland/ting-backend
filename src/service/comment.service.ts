import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { commentEntity } from 'src/entity/comment.entity';
import { MoreThan,LessThan,Between } from 'typeorm';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class commentService {  
  
  constructor(
    @InjectRepository(commentEntity) private ecg_csv_ecgdata_arrRepository:Repository<commentEntity>,
    // private configService:ConfigService
    ){}

}