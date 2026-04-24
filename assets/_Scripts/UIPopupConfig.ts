import { _decorator, Component, Prefab } from 'cc';
import { UIBasePopup } from './UIBasePopup';
const { ccclass, property } = _decorator;

@ccclass('UIPopupItem')
export class UIPopupItem {
    @property(Prefab)
    public prefab: Prefab = null;
}

@ccclass('UIPopupConfig')
export class UIPopupConfig extends Component {
    @property([UIPopupItem])
    public listPopups: UIPopupItem[] = [];
}


