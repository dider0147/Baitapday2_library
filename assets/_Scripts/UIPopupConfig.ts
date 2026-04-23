import { _decorator, Asset, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIPopupItem')
export class UIPopupItem {
    @property
    public name: string = "";
    @property(Prefab)
    public prefab: Prefab = null;
}

@ccclass('UIPopupConfig')
export class UIPopupConfig extends Asset {
    @property([UIPopupItem])
    public listPopups: UIPopupItem[] = [];
}


