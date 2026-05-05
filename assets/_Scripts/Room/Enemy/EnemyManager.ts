import { _decorator, director, instantiate, Node, Prefab, Vec3 } from 'cc';
import { BasePooling } from '../BasePooling';
import { RoomManager } from '../RoomManager';
import { RoomState } from '../../GameData';
import { GameEventData } from '../../GameEventData';
import { BaseEnemy } from './BaseEnemy';
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

    private readonly SPAWN_TIME_THRESHOD = 1;

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
    protected get(prefab: Prefab) {
        let prefabName = prefab.name;
        if (!this.prefabPools.has(prefabName)) {
            this.prefabPools.set(prefabName, []);
        }
        let list = this.prefabPools.get(prefabName)!;
        let result: Node = null;
        result = list.find(node => !node.activeInHierarchy);
        if (result) {
            result.active = true;
        } else {
            result = instantiate(prefab);
            list.push(result);
            result.name = prefabName;
            result.getComponent(BaseEnemy).init(list.length);
        }
        return result;
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
    public return(name: string, ID: number) {
        let list = this.prefabPools.get(name)!;
        const enemyNode = list.find(node => node.getComponent(BaseEnemy).getID() === ID);
        if (enemyNode) {
            enemyNode.active = false;
            //list.push(enemyNode);
        }
    }
    public reset() {
        this.currentSpawnTime = 0;
    }
    protected onDestroy() {
        EnemyManager.instance = null;
    }
}

