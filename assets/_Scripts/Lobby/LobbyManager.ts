import { _decorator, Button, Component } from 'cc';
import { GameManager } from '../GameManager';
import { GameState } from '../GameData';
import { PopupManager } from '../Popup/PopupManager';
import { PopupSetting } from '../Popup/PopupSetting';
const { ccclass, property } = _decorator;

@ccclass('LobbyManager')
export class LobbyManager extends Component {
    @property(Button)
    private startButton: Button = null;
    @property(Button)
    private settingButton: Button = null;
    @property(Button)
    private quitButton: Button = null;
    
    protected onEnable() {
        this.init();
    }

    init() {
        this.startButton.node.on(Button.EventType.CLICK, this.onStartClickBtn, this);
        this.settingButton.node.on(Button.EventType.CLICK, this.onSettingClickBtn, this);
        this.quitButton.node.on(Button.EventType.CLICK, this.onQuitClickButton, this);
    }

    private onStartClickBtn() {
        GameManager.instance.setState(GameState.room);
    }
    private onSettingClickBtn() {
        PopupManager.instance.onShowPopupSetting();
    }
    private onQuitClickButton() {
        window.close();
    }
    protected onDisable() {
        this.startButton.node.off(Button.EventType.CLICK, this.onStartClickBtn, this);
        this.settingButton.node.off(Button.EventType.CLICK, this.onSettingClickBtn, this);
        this.quitButton.node.off(Button.EventType.CLICK, this.onQuitClickButton, this);
    }
}

