import { _decorator, Button, Component, Node } from 'cc';
import { GameManager } from './GameManager';
import { GameState } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('LobbyManager')
export class LobbyManager extends Component {
    @property(Button)
    private startButton: Button = null;
    @property(Button)
    private settingButton: Button = null;
    @property(Button)
    private quitButton: Button = null;

    protected start() {
        this.init();
    }

    init() {
        this.startButton.node.on(Button.EventType.CLICK, this.onStartClickBtn, this);
        //this.settingButton.node.on
    }

    private onStartClickBtn() {
        GameManager.instance.setState(GameState.room);
    }
    protected onDestroy() {
        this.startButton.node.off(Button.EventType.CLICK, this.onStartClickBtn, this);
    }
}

