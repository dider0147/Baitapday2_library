import { _decorator, instantiate, Prefab, Vec2, Vec3, Node } from 'cc';
import { BasePooling } from '../BasePooling';
import { BaseBullet } from './BaseBullet';

const { ccclass } = _decorator;

@ccclass('BulletController')
export class BulletController extends BasePooling {
    public static instance: BulletController = null;

    protected onLoad() {
        BulletController.instance = this;
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
            const script = result.getComponent(BaseBullet as any) as BaseBullet;
            script.init(list.length);
        }
        return result;
    }

    public return(name: string, ID: number) {
        let list = this.prefabPools.get(name)!;
        const bulletNode = list.find(node => {
            const script = node.getComponent(BaseBullet as any) as BaseBullet;
            return script.getID() === ID;
        });
        if (bulletNode) {
            bulletNode.active = false;
        }
}
  
    public spawn(prefab: Prefab, dir: Vec2, worldPos: Vec3) {
        const bulletNode = this.get(prefab);
        const posFire = this.layer.convertToNodeSpaceAR(worldPos);
        bulletNode.position = posFire;
        this.layer.node.addChild(bulletNode);
        let script = bulletNode.getComponent(BaseBullet as any) as BaseBullet;
        script.fire(dir);
    }

    protected onDestroy() {
        BulletController.instance = null;
    }
}



