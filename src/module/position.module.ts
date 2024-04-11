import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { positionController } from 'src/controller/position.controller';
import { positionEntity } from 'src/entity/user_position.entity';
import { positionService } from 'src/service/position.service';



@Module({
    imports:[
        TypeOrmModule.forFeature([positionEntity])
    ],
    controllers:[positionController],
    providers:[positionService]
})
export class positionModule {}