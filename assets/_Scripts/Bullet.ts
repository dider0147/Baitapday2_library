import { _decorator, Component, math, Node, Vec3 } from 'cc';
import { BaseBullet } from './BaseBullet';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends BaseBullet {

    public fire(direction: Vec3) {
        let moveVelocity = direction.multiplyScalar(this.speed);
        this.rb.setLinearVelocity(moveVelocity);
    }
    
}

export interface Ibullet{
}

