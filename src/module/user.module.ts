import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userController } from 'src/controller/user.controller';
import { Login_logEntity } from 'src/entity/login_log.entity';
import { DelUserLogEntity, userEntity } from 'src/entity/user.entity';
import { Login_logService } from 'src/service/login_log.service';
import { userService } from 'src/service/user.service';



@Module({
    imports:[
        TypeOrmModule.forFeature([userEntity,DelUserLogEntity,Login_logEntity])
    ],
    exports:[userService],
    controllers:[userController],
    providers:[userService,Login_logService]
})
export class userModule {}