import { _decorator, Component, Node, Prefab, Vec2, Vec3 } from 'cc';
import { BasePooling } from './BasePooling';
import { RoomManager } from './RoomManager';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends BasePooling {
    @property([Prefab])
    private enemies: Prefab[] = [];
    @property(Node)
    private spawnNode: Node = null;

    private limitY: number = 0;

    public static instance: EnemyManager = null;

    protected onLoad() {
        EnemyManager.instance = this;
    }

    protected start() {
        this.limitY = RoomManager.instance.getCanvas().contentSize.height / 2;
    }

    private spawn(prefab: Prefab, position: Vec2) {
        if (this.enemies.length <= 0) {
            return;
        }
        const enemy = this.get(prefab);
        const yPos = this.getRandomRange(-this.limitY, this.limitY);
        enemy.position = new Vec3(this.spawnNode.position.x, yPos, 0);
    }
    private getRandomRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

