import { _decorator, Component, Node, sp, Vec2 } from 'cc';
import { PlayerState, CharacterData } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('Character')
export class Character extends Component {

    @property(sp.Skeleton)
    private spine: sp.Skeleton = null;

    @property
    private speed: number = 0;

    private isLeftFace: boolean = false;
    private currentState: PlayerState = PlayerState.NONE;
    
    public moving(velocity: Vec2) {
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
        console.log("shoot");
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



