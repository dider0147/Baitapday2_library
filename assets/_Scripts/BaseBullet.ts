import { _decorator, Component, Node, RigidBody, RigidBody2D, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseBullet')
export abstract class BaseBullet extends Component {
    @property
    protected speed: number = 0;
    @property
    protected damage: number = 0;
    @property(RigidBody2D)
    protected rb: RigidBody2D = null;
    
    public abstract fire(direction: Vec2);
}

