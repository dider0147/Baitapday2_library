import { _decorator, Component, UITransform } from 'cc';
import { RoomState } from './GameData';
import { CharacterController } from './CharacterController';
const { ccclass, property } = _decorator;

@ccclass('RoomManager')
export class RoomManager extends Component {
    @property(UITransform)
    private canvas: UITransform = null;

    private currentState: RoomState = null;

    public static instance: RoomManager = null;

    protected onLoad() {
        RoomManager.instance = this;
    }
    protected start() {
        this.setState(RoomState.ready);
    }
    public setState(state: RoomState) {
        if (this.currentState && this.currentState == state) {
            return;
        }
        switch (state) {
            case RoomState.ready:
                CharacterController.instance.characterReady();
                break;
            case RoomState.start:
                break;
            case RoomState.pause:
                break;
            case RoomState.end:
                break;
        }
        this.currentState = state;
    }
    public getState = () => this.currentState;
    public getCanvas = () => this.canvas;
    protected onDisable() {
        this.currentState = null;
    }
}

