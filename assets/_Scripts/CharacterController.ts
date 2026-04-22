import { _decorator, Component, director, Node, UITransform, Vec2 } from 'cc';
import { Character } from './Character';
import { GameEventData } from './GameEventData';
import { PlayerState } from './GameData';
import { BulletController } from './BulletController';
const { ccclass, property } = _decorator;

@ccclass('CharacterController')
export class CharacterController extends Component {
    @property(Character)
    private char: Character = null;

    private movement: Vec2 = new Vec2(0, 0);

    public static instance: CharacterController = null;

    start() {
        CharacterController.instance = this;
        this.register();
    }

    private register() {
        director.on(GameEventData.INPUT_MOVE, this.setMovement, this);
        director.on(GameEventData.INPUT_FIRE,this.attack, this);
    }
    protected update(dt: number) {
        this.playerMoving(dt);
    }
    private playerMoving(dt: number) {
        let normalizeDir = this.movement.normalize();
        if (Math.abs(normalizeDir.length()) > 0) {
            this.char.setState(PlayerState.MOVE);
            const velocity = new Vec2(normalizeDir.x * dt, normalizeDir.y * dt);
            this.char.moving(velocity);
        } else {
            this.char.setState(PlayerState.IDLE);
        }
        
    }
    private attack() {
        this.char.shoot();
    }
    private setMovement(dir: Vec2) {
        console.log("set roi");
        this.movement.x = dir.x;
        this.movement.y = dir.y;
    }
    private unregister() {
        director.targetOff(this);
    }
    protected onDestroy() {
        this.unregister();
    }
}

