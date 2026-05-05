import { _decorator, Component, instantiate, Node, Prefab, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BasePooling')
export abstract class BasePooling extends Component {

    @property(UITransform)
    protected layer: UITransform = null;
    protected prefabPools: Map<string, Node[]> = new Map();

    protected abstract get(prefab: Prefab);
    public abstract return(name: string, ID: number);
}

