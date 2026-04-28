import { _decorator, Color, Component, director, ProgressBar, RigidBody2D, Sprite, tween, Vec2 } from 'cc';
import { EnemyManager } from './EnemyManager';
import { RoomManager } from './RoomManager';
import { GameEventData } from './GameEventData';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('BaseEnemy')
export class BaseEnemy extends Component {
    @property(RigidBody2D)
    private rb: RigidBody2D = null;
    @property(Sprite)
    private sprite: Sprite = null;
    @property(ProgressBar)
    private hpBar = null;
    @property
    private speed: number = 0;
    @property
    private maxHP: number = 100;
    @property
    private point = 0;

    private currentHP: number = 0;

    private limitX = 0;

    protected onEnable() {
        this.currentHP = this.maxHP;
        this.hpBar.progress = 1;
        this.move();
    }

    protected start() {
        this.limitX = RoomManager.instance.getCanvas().contentSize.width / 2;
        director.on(GameEventData.ROOM_END, this.reset, this);
    }
    protected update(dt: number) {
        this.checkLimit();
    }
    private move() {
        const leftDir = new Vec2(-1, 0);
        this.rb.linearVelocity = leftDir.multiplyScalar(this.speed);
    }

    private checkLimit() {
        if (this.node.position.x < -this.limitX) {
            EnemyManager.instance.return(this.node);
        }
    }

    public hit(damage: number) {
        this.currentHP -= damage;
        this.updateProgressBar();
        this.flashRed();
        if (this.currentHP <= 0) {
            this.die();
        }
    }

    private flashRed() {
        tween(this.sprite).stop();
        tween(this.sprite)
            .to(0.1, {color: Color.RED})
            .to(0.1, {color: Color.WHITE})
            .start();
    }
    private updateProgressBar() {
        tween(this.hpBar).stop();
        tween(this.hpBar)
            .to(0.1, {progress: this.calculateHPBar()})
            .start();
    }
    private calculateHPBar = () => this.currentHP / this.maxHP;
    private die() {
        AudioManager.instance.playSFXSound();
        this.reset();
        RoomManager.instance.updateScore(this.point);
    }
    public reset() {
        this.rb.linearVelocity = Vec2.ZERO;
        EnemyManager.instance.return(this.node);
    }
    protected onDestroy(): void {
        director.off(GameEventData.ROOM_END, this.reset, this);
    }
}

