import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { MySqlMslConfigService } from "src/service/mysqlconfig.service";
import { userModule } from "src/module/user.module";
import { positionModule } from 'src/module/position.module';
import { nboModule } from 'src/module/nbo.module';
import { smsModule } from 'src/module/sms.module';
import { Login_logModule } from 'src/module/Login_log.module';
import { appversionModule } from 'src/module/appversion.module';



export class allModule{

    static appImport = [
        ConfigModule.forRoot({
            isGlobal:true,
            envFilePath:'.env',
        }),

        TypeOrmModule.forRootAsync({
            useClass:MySqlMslConfigService,
            inject:[MySqlMslConfigService]
        }),
        userModule,
        positionModule,
        nboModule,
        // commentModule,
        // nboImgModule,
        smsModule,
        Login_logModule,
        appversionModule,
        //  ecg_csv_bpmdayModule,
        // ecg_csv_ecgdataModule,admin_login_logModule,
        // parentsModule,ecg_byteModule,app_logModule,app_bleModule
        
    ]
}
    


