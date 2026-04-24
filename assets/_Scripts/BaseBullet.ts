import { _decorator, Collider2D, Component, Contact2DType, director, IPhysics2DContact, RigidBody2D, Vec2 } from 'cc';
import { GameEventData } from './GameEventData';
import { BulletController } from './BulletController';
const { ccclass, property } = _decorator;

@ccclass('BaseBullet')
export abstract class BaseBullet extends Component {
    @property
    protected speed: number = 0;
    @property
    protected damage: number = 0;
    @property(RigidBody2D)
    protected rb: RigidBody2D = null;
    @property(Collider2D)
    protected collider: Collider2D = null;

    protected start() {
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
    
    public abstract fire(direction: Vec2);

    protected onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        const data = {
            enemy: otherCollider.node,
            damage: this.damage
        }
        director.emit(GameEventData.ENEMY_HIT, data);
        BulletController.instance.return(this.node);
    }
}

