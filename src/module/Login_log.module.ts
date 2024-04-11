import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login_logController } from 'src/controller/login_log.controller';
import { Login_logEntity } from 'src/entity/login_log.entity';
import { Login_logService } from 'src/service/login_log.service';


@Module({
    imports:[
        TypeOrmModule.forFeature([Login_logEntity])
    ],
    controllers:[Login_logController],
    providers:[Login_logService]
})
export class Login_logModule {}