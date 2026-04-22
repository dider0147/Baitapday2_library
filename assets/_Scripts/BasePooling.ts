import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BasePooling')
export abstract class BasePooling extends Component {

    protected prefabPools: Map<string, Node[]> = new Map();

    public get(prefab: Prefab) {
        let prefabName = prefab.name;
        if (!this.prefabPools.has(prefabName)) {
            this.prefabPools.set(prefabName, []);
        }
        let list = this.prefabPools.get(prefabName)!;
        let result: Node = null;
        if (list.length > 0) {
            result = list.pop()!;
            result.active = true;
        } else {
            result = instantiate(prefab);
            result.name = prefabName;
        }
        return result;
    }
    public return(node: Node) {
        let prefabName = node.name;
        node.active = false;
        this.prefabPools.get(prefabName)!.push(node);
    }
}

