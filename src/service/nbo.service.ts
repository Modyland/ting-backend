import { nboEntity } from "src/entity/nbo.entity";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,MoreThanOrEqual,MoreThan,In } from 'typeorm';
import { NboImgService } from "./nboimg.service";


@Injectable()
export class nboService {  
  constructor(
    @InjectRepository(nboEntity) private nboRepository:Repository<nboEntity>,    
    private nboImgService:NboImgService,
    ){}  

}