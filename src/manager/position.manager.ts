import { Position } from "src/interface/Position";

export class PositionManager{
    private positions: Position[] = [];



    AddOrUpdatePosition(userId:string,newPosition:Position){
        
        const index = this.positions.findIndex(p => 
            p.userId === userId
            );
        if(index !== -1){
            // 사용자 정보 업데이트
            this.positions[index] = newPosition;
        }else{
            // 새로운 사용자 
            this.positions.push(newPosition)
        }
        
    }

    getPosition(){
        return this.positions;
    }
}