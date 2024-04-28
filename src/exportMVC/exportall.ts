import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { MySqlMslConfigService } from "src/service/mysqlconfig.service";
import { UserModule } from "src/module/user.module";
import { PositionModule } from 'src/module/position.module';
import { NboModule } from 'src/module/nbo.module';
import { CommentModule } from 'src/module/comment.module';
// import { nboImgModule } from 'src/module/nboImg.module';
import { SmsModule } from 'src/module/sms.module';
import { Login_logModule } from 'src/module/Login_log.module';
import { AppversionModule } from 'src/module/appversion.module';



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
        UserModule,
        PositionModule,
        NboModule,
        CommentModule,
        // nboImgModule,        
        SmsModule,
        Login_logModule,
        AppversionModule,
        //  ecg_csv_bpmdayModule,
        // ecg_csv_ecgdataModule,admin_login_logModule,
        // parentsModule,ecg_byteModule,app_logModule,app_bleModule
        
    ]
}
    


