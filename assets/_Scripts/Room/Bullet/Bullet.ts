import { _decorator, Vec2 } from 'cc';
import { BaseBullet } from './BaseBullet';
import { RoomManager } from '../../Room/RoomManager';
import { BulletController } from './BulletController';
const { ccclass } = _decorator;

@ccclass('Bullet')
export class Bullet extends BaseBullet {
    private limitX: number = 0;
    private limitY: number = 0;
    private direction: Vec2 = new Vec2(0, 0);

    protected start() {
        super.start();
    }

    protected update(dt: number) {
        this.checkLimit(dt);
    }

    public init(ID: number) {
        super.init(ID);
        const canvas = RoomManager.instance.getCanvas();
        this.limitX = canvas.contentSize.width / 2;
        this.limitY = canvas.contentSize.height / 2;
    }

    public fire(direction: Vec2) {
        this.direction = direction;
        this.rb.linearVelocity = direction.multiplyScalar(this.speed);
    }

    private checkLimit(dt) {
        let nextX = this.node.position.x + this.speed * this.direction.x * dt;
        let nextY = this.node.position.y + this.speed * this.direction.y * dt;
        const isInScreen = nextX < this.limitX && nextX > -this.limitX && nextY < this.limitY && nextY > -this.limitY
        if (!isInScreen) {
            BulletController.instance.return(this.node.name, this.ID);
        }
    }
    
}

