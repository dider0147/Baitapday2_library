import { _decorator, Component, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RoomManager')
export class RoomManager extends Component {
    @property(UITransform)
    private canvas: UITransform = null;

    public static instance: RoomManager = null;

    protected onLoad() {
        RoomManager.instance = this;
    }
    protected start() {
        
    }
    public getCanvas = () => this.canvas;
}

