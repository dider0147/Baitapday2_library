import { _decorator, Component, Node, Prefab, Vec2, UITransform, Vec3 } from 'cc';
import { BasePooling } from './BasePooling';
import { BaseBullet } from './BaseBullet';

const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController extends BasePooling {
    @property(UITransform)
    private bulletLayer: UITransform = null;

    public static instance: BulletController = null;

    protected onLoad() {
        BulletController.instance = this;
    }
  
    public spawn(prefab: Prefab, dir: Vec2, worldPos: Vec3) {
        const bulletNode = this.get(prefab);
        const posFire = this.bulletLayer.convertToNodeSpaceAR(worldPos);
        bulletNode.position = posFire;
        this.bulletLayer.node.addChild(bulletNode);
        let script = bulletNode.getComponent(BaseBullet as any) as BaseBullet;
        script.fire(dir);
    }
}



