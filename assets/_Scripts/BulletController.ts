import { _decorator, Component, Node, Prefab, Vec2, UITransform, Vec3 } from 'cc';
import { Singleton } from './Singleton';
import { BasePooling } from './BasePooling';
import { BaseBullet } from './BaseBullet';

const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController extends BasePooling<BulletController> {
    @property(UITransform)
    private bulletLayer: UITransform = null;
    @property(Prefab)
    prefab: Prefab;


    protected onLoad(): void {
        this.spawn(this.prefab, new Vec2(1, 0),new Vec3(0, 0, 0));
    }
  
    public spawn(prefab: Prefab, dir: Vec2, worldPos: Vec3) {
        const bulletNode = this.get(prefab);
        console.log(bulletNode);
        const posFire = this.bulletLayer.convertToNodeSpaceAR(worldPos);
        bulletNode.position = posFire;
        this.bulletLayer.node.addChild(bulletNode);
        let script = bulletNode.getComponent(typeof(BaseBullet));
        console.log(script);
        
    }
}



