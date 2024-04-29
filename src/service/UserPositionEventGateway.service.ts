import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server ,Socket} from 'socket.io';
import { PositionService } from './position.service';
import { PositionManager } from 'src/manager/position.manager';

@WebSocketGateway({
  cors:{
    origin:'*',
  },
})
export class UserPositionEventGateway implements OnGatewayConnection,OnGatewayDisconnect{
  constructor(
    private positionService:PositionService
  ){}

  private positionManager = new PositionManager();

  @WebSocketServer() server:Server;

  handleConnection(client: Socket, ...args: any[]) {    
    console.log('connect success',client.id)    
  }

  handleDisconnect(client: Socket) {
    console.log('disconnect success',client.id)
  }

  @SubscribeMessage('requestUserPositionData')
  handleUserPositionDataRequest(client: Socket, payload:any){    
    console.log('on')
    client.emit('test','test')
  }

  @SubscribeMessage('requestTest')
  handleRequestTest(client: Socket, payload:any){    
    console.log('on')   

    //필요한 정보 보내기

    client.emit('test','request')

    //서버로 정보 보내기

    console.log('off')
  }

}

