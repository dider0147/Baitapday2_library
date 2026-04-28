import { _decorator, Component, instantiate, Prefab } from 'cc';
import { UIBasePopup } from './UIBasePopup';
const { ccclass, property } = _decorator;

@ccclass('PopupManager')
export class PopupManager extends Component {
    @property([Prefab])
    private prefabs: Prefab[] = [];
    
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

    public show<T extends UIBasePopup>(type: { new(): T }): T {
        const className = (type as any).name;

        if (this.instantiatePopup.has(className)) {
            let popup = this. instantiatePopup.get(className);
            popup.show();
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
            return comp;
        }
        return null;
    }
    public hide<T extends UIBasePopup>(type: { new(): T }) {
        const className = (type as any).name;
        const popup = this.instantiatePopup.get(className);
        
        if (popup) {
            popup.hide();
        }
    }

    public openPopupSetting() {
        
    }
}

