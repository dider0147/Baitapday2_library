import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { Singleton } from './Singleton';
const { ccclass, property } = _decorator;

export abstract class BasePooling<T> extends Singleton<T> {
    @property(Prefab)

    protected prefabPools: Map<string, Node[]> = new Map();

    public get(prefab: Prefab) {
        let prefabName = prefab.name;
        if (!this.prefabPools.has(prefabName)) {
            this.prefabPools.set(prefabName, []);
        }
        let result: Node = null;
        if (this.prefabPools.get(prefabName).length > 0) {
            result =  this.prefabPools[prefabName].get();
        } else {
            result = instantiate(prefab);
            result.name = prefabName;
        }
        return result;
    }
    public return(node: Node) {
        let prefabName = node.name;
        this.prefabPools[prefabName].put(node);
    }
}

