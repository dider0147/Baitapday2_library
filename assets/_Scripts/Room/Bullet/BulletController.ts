import { _decorator, Prefab, Vec2, Vec3 } from 'cc';
import { BasePooling } from '../BasePooling';
import { BaseBullet } from './BaseBullet';

const { ccclass } = _decorator;

@ccclass('BulletController')
export class BulletController extends BasePooling {

    public static instance: BulletController = null;

    protected onLoad() {
        BulletController.instance = this;
    }
  
    public spawn(prefab: Prefab, dir: Vec2, worldPos: Vec3) {
        const bulletNode = this.get(prefab);
        const posFire = this.layer.convertToNodeSpaceAR(worldPos);
        bulletNode.position = posFire;
        this.layer.node.addChild(bulletNode);
        let script = bulletNode.getComponent(BaseBullet as any) as BaseBullet;
        script.fire(dir);
    }
}



