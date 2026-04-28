import { _decorator, Component, director, Vec2, Node } from 'cc';
import { Character } from './Character';
import { GameEventData } from '../../GameEventData';
import { PlayerState } from '../../GameData';
const { ccclass, property } = _decorator;

@ccclass('CharacterController')
export class CharacterController extends Component {
    @property(Character)
    private char: Character = null;
    @property(Node)
    private spawnNode: Node = null;
    @property
    private attackCD: number = 0.5;

    private movement: Vec2 = new Vec2(0, 0);
    private timeStopMoving: number = 0;

    public static instance: CharacterController = null;

    protected onLoad() {
        CharacterController.instance = this;
    }

    start() {
        this.register();
    }
    public characterReady() {
        this.char.init();
        this.char.setState(PlayerState.PORTAL);
        this.timeStopMoving = 3.5;
    }
    private register() {
        director.on(GameEventData.INPUT_MOVE, this.setMovement, this);
        director.on(GameEventData.INPUT_FIRE,this.attack, this);
        director.on(GameEventData.ROOM_END, this.reset, this);
    }
    protected update(dt: number) {
        if (!this.checkCanAttack()) {
            this.timeStopMoving -= dt;
            return;
        }
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
        if (this.checkCanAttack()) {
            this.timeStopMoving = this.attackCD;
            this.char.shoot();
        } 
    }
    private checkCanAttack() {
        if (this.timeStopMoving > 0) {
            return false;
        }
        return true;
    }
    private setMovement(dir: Vec2) {
        this.movement.x = dir.x;
        this.movement.y = dir.y;
    }
    private reset() {
        this.char.node.position = this.spawnNode.position;
        this.movement = new Vec2(0, 0);
        this.timeStopMoving = 0;
        this.char.reset();
    }
    private unregister() {
        director.targetOff(this);
        CharacterController.instance = null;
    }
    protected onDestroy() {
        this.unregister();
        CharacterController.instance = null;
    }
}

