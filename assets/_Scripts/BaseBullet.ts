import { _decorator, Component, Node, RigidBody, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseBullet')
export abstract class BaseBullet extends Component {
    @property
    protected speed: number = 0;
    @property
    protected damage: number = 0;
    @property(RigidBody)
    protected rb: RigidBody = null;
    
    public abstract fire(direction: Vec3);
}

