import { _decorator, Component, Node, Prefab, sp, UITransform, Vec2, Vec3 } from 'cc';
import { PlayerState, CharacterData } from './GameData';
import { BulletController } from './BulletController';
import { RoomManager } from './RoomManager';
const { ccclass, property } = _decorator;

@ccclass('Character')
export class Character extends Component {

    @property(sp.Skeleton)
    private spine: sp.Skeleton = null;
    @property(UITransform)
    private firePoint: UITransform = null;
    @property(Prefab)
    private bulletPrefab: Prefab = null;
    @property
    private speed: number = 0;

    private isLeftFace: boolean = false;
    private currentState: PlayerState = PlayerState.NONE;
    private limitX: number = 0;
    private limitY: number = 0;

    init() {
        const canvas = RoomManager.instance.getCanvas();
        this.limitX = canvas.contentSize.width / 2;
        this.limitY = canvas.contentSize.height / 2;
    }

    setMixAnim() {
        CharacterData.MIX_CONFIGS.forEach(config => {
            this.spine.setMix(config.from, config.to, config.duration);
        })
    }
    
    public moving(velocity: Vec2) {
        let nextX = this.node.position.x + velocity.x * this.speed;
        let nextY = this.node.position.y + velocity.y * this.speed;
        if (nextX > this.limitX || nextX < -this.limitX) {
            velocity.x = 0;
        }
        if (nextY > this.limitY || nextY < -this.limitY) {
            velocity.y = 0;
        }
        this.node.setPosition(this.node.position.x + velocity.x * this.speed, this.node.position.y + velocity.y * this.speed);
        const shouldFlip = (!this.isLeftFace && velocity.x < 0) || (this.isLeftFace && velocity.x > 0);
        if (shouldFlip) {
            this.flip();
        }
    }

    private flip() {
        let newScaleX = this.spine.node.scale.x * -1;
        this.spine.node.setScale(newScaleX, this.spine.node.scale.y);
        this.isLeftFace = !this.isLeftFace;
    }

    public shoot() {
        let worldPos = this.firePoint.convertToWorldSpaceAR(Vec3.ZERO);
        let v2RightDir = new Vec2(1, 0);
        let dir = this.isLeftFace ? v2RightDir.multiplyScalar(-1) : v2RightDir; 
        BulletController.instance.spawn(this.bulletPrefab, dir, worldPos);
        this.setState(PlayerState.ATTACK);
    }
    private setAnimation(name: string, isLoop: boolean) {
        this.spine.setAnimation(0, name, isLoop);
    }
    public setState(state: PlayerState) {
        if (this.currentState == state) {
            return;
        }
        switch(state) {
            case PlayerState.PORTAL:
                this.setAnimation(CharacterData.ANIM_PORTAL, false);
                break;
            case PlayerState.IDLE:
                this.setAnimation(CharacterData.ANIM_IDLE, true);
                break;
            case PlayerState.MOVE:
                this.setAnimation(CharacterData.ANIM_RUN, true);
                break;
            case PlayerState.ATTACK:
                this.setAnimation(CharacterData.ANIM_SHOOT, false);
                break;
            case PlayerState.DEATH:
                this.setAnimation(CharacterData.ANIM_DEATH, false);
                break;
        }
        this.currentState = state;
    }
    public getState = () => this.currentState;
}



