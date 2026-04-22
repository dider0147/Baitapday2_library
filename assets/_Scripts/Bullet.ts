import { _decorator, Vec2 } from 'cc';
import { BaseBullet } from './BaseBullet';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends BaseBullet {

    public fire(direction: Vec2) {
        this.rb.linearVelocity = direction.multiplyScalar(this.speed);
    }
    
}

