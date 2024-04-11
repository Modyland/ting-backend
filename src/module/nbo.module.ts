import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { nboController } from 'src/controller/nbo.controller';
import { nboEntity } from 'src/entity/nbo.entity';
import { nboImgEntity } from 'src/entity/profileLog.entity';
import { nboService } from 'src/service/nbo.service';
import { NboImgService } from 'src/service/nboimg.service';



@Module({
    imports:[
        TypeOrmModule.forFeature([nboEntity,nboImgEntity])
    ],
    controllers:[nboController],
    providers:[nboService,NboImgService]
})
export class nboModule {}