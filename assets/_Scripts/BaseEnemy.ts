import { _decorator, Color, color, Component, director, Node, RigidBody2D, Sprite, tween, Vec2 } from 'cc';
import { GameEventData } from './GameEventData';
import { EnemyManager } from './EnemyManager';
const { ccclass, property } = _decorator;

@ccclass('BaseEnemy')
export class BaseEnemy extends Component {
    @property(RigidBody2D)
    private rb: RigidBody2D = null;
    @property(Sprite)
    private sprite: Sprite = null;
    @property
    private speed: number = 0;
    @property
    private maxHP: number = 100;

    private currentHP: number = 0;

    protected onEnable() {
        this.currentHP = this.maxHP;
        this.registerEvent();
        this.move();
    }
    private registerEvent() {
        director.on(GameEventData.ENEMY_HIT, this.hit, this);
    }

    private move() {
        const leftDir = new Vec2(-1, 0);
        this.rb.linearVelocity = leftDir.multiplyScalar(this.speed);
    }

    private hit(damage: number) {
        this.currentHP -= damage;
        this.flashRed();
        if (this.currentHP <= 0) {
            this.die();
        }
    }

    flashRed() {
        tween(this.sprite).stop();
        tween(this.sprite)
            .to(0.1, {color: Color.RED})
            .to(0.1, {color: Color.WHITE})
            .start();
    }

    private die() {
        this.rb.linearVelocity = Vec2.ZERO;
        EnemyManager.instance.return(this.node);
    }
}

