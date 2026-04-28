import { _decorator, director, Node, Prefab, Vec3 } from 'cc';
import { BasePooling } from '../BasePooling';
import { RoomManager } from '../RoomManager';
import { RoomState } from '../../GameData';
import { GameEventData } from '../../GameEventData';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends BasePooling {
    @property([Prefab])
    private enemies: Prefab[] = [];
    @property(Node)
    private spawnNode: Node = null;
    @property
    private spawnOffset = 0;

    private limitY: number = 0;
    private currentSpawnTime = 0;

    public static instance: EnemyManager = null;

    private readonly SPAWN_TIME_THRESHOD = 2;

    protected onLoad() {
        EnemyManager.instance = this;
    }

    protected start() {
        director.on(GameEventData.ROOM_END, this.reset, this);
        this.limitY = (RoomManager.instance.getCanvas().contentSize.height / 2) - this.spawnOffset;
    }

    protected update(dt: number) {
        this.spawnByTime(dt);
    }
    public spawnByTime(dt: number) {
        if (RoomManager.instance.getState() != RoomState.start) {
            return;
        }
        this.currentSpawnTime += dt;
        if (this.currentSpawnTime >= this.SPAWN_TIME_THRESHOD) {
            const enemy = this.enemies[this.getRandomRange(0, this.enemies.length - 1)];
            this.spawn(enemy);
            this.currentSpawnTime = 0;
        }
    }

    private spawn(prefab: Prefab) {
        if (this.enemies.length <= 0) {
            return;
        }
        const enemy = this.get(prefab);
        const yPos = this.getRandomRange(-this.limitY, this.limitY);
        enemy.position = new Vec3(this.spawnNode.position.x, yPos, 0);
        this.layer.node.addChild(enemy);
    }
    private getRandomRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    public reset() {
        this.currentSpawnTime = 0;
    }
    protected onDestroy() {
        EnemyManager.instance = null;
    }
}

