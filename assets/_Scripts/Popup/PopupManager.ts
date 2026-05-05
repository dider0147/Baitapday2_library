import { _decorator, Component, instantiate, Prefab, Node } from 'cc';
import { UIBasePopup } from './UIBasePopup';
import { PopupSetting } from './PopupSetting';
import { PopupPause } from './PopupPause';
import { QuitPopup } from './QuitPopup';
import { UIPopupWin } from './UIPopupWin';
const { ccclass, property } = _decorator;

@ccclass('PopupManager')
export class PopupManager extends Component {
    @property([Prefab])
    private prefabs: Prefab[] = [];
    @property(Node)
    private panelSupport: Node = null;
    
    private instantiatePopup: Map<string, UIBasePopup> = new Map(); 

    public static instance: PopupManager = null;

    protected onLoad() {
        PopupManager.instance = this;
    }

    public get<T extends UIBasePopup>(type: { new(): T }): T {
        const className = (type as any).name;

        if (this.instantiatePopup.has(className)) {
            return this.instantiatePopup.get(className) as T;
        }

        const item = this.prefabs.find(p => {
            return p && p.data.getComponent(type) !== null;
        });

        if (item) {
            const newNode = instantiate(item);
            newNode.parent = this.node;
            newNode.active = false; 

            const comp = newNode.getComponent(type);
            this.instantiatePopup.set(className, comp);
            return comp;
        }
        return null;
    }

    private show<T extends UIBasePopup>(type: { new(): T }): T {
        const className = (type as any).name;

        if (this.instantiatePopup.has(className)) {
            let popup = this. instantiatePopup.get(className);
            popup.show();
            this.panelSupport.active = true;
            return popup as T;
        }

        const item = this.prefabs.find(p => {
            return p.data.getComponent(type) !== null;
        });

        if (item) {
            const newNode = instantiate(item);
            newNode.parent = this.node;
            const comp = newNode.getComponent(type);
            
            this.instantiatePopup.set(className, comp);
            comp.show();
            this.panelSupport.active = true;
            return comp;
        }
        return null;
    }
    private hide<T extends UIBasePopup>(type: { new(): T }) {
        const className = (type as any).name;
        const popup = this.instantiatePopup.get(className);
        
        if (popup) {
            popup.hide();
            this.panelSupport.active = false;
        }
    }

    public onShowPopupSetting = () => this.show(PopupSetting);
    public onHidePopupSetting = () => this.hide(PopupSetting);
    public onShowPopupPause = () => this.show(PopupPause);
    public onHidePopupPause = () => this.hide(PopupPause);
    public onShowQuitPopup = () => this.show(QuitPopup);
    public onHideQuitPopup = () => this.hide(QuitPopup);
    public onShowPopupWin = () => this.show(UIPopupWin);
    public onHidePopupWin = () => this.hide(UIPopupWin);
}

