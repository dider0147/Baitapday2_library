import { _decorator, Component, Label, Node, Sprite } from 'cc';
import { RoomManager } from './RoomManager';
import { RoomState } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('ClockTimer')
export class ClockTimer extends Component {
    @property(Sprite)
    private timeSprite: Sprite = null;
    @property(Label)
    private timeLabel: Label = null;

    private maxTime: number = 0;
    private currentTime: number = 0;

    protected onEnable() {
        this.timeSprite.fillRange = 0;
    }

    protected update(dt: number) {
        if (RoomManager.instance.getState() == RoomState.start) {
            this.currentTime -= dt;
            this.refreshUI();
        }
    }


    public init(time: number) {
        this.maxTime = time;
        this.currentTime = time;
        this.refreshUI();
    }
    private refreshUI() {
        if (this.currentTime < 0) {
            RoomManager.instance.setState(RoomState.win);
            return;
        }
        this.timeSprite.fillRange = this.currentTime / this.maxTime;
        this.timeLabel.string = Math.floor(this.currentTime).toString();
    } 
}

