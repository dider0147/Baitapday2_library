import { _decorator, Button, director } from 'cc';
import { UIBasePopup } from './UIBasePopup';
import { PopupManager } from './PopupManager';
import { QuitPopup } from './QuitPopup';
import { RoomManager } from '../Room/RoomManager';
import { RoomState } from '../GameData';
const { ccclass, property } = _decorator;

@ccclass('PopupPause')
export class PopupPause extends UIBasePopup {
    @property(Button)
    private quitButton = null;
    @property(Button)
    private resumeButton = null;
    @property(Button)
    private restartButton = null;

    protected onEnable(): void {
        this.resumeButton.node.on(Button.EventType.CLICK, this.resumeClick, this);
        this.quitButton.node.on(Button.EventType.CLICK, this.quitButtonClick, this);
        this.restartButton.node.on(Button.EventType.CLICK, this.restartButtonClick, this);
    }
    resumeClick() {
        director.resume();
        PopupManager.instance.onHidePopupPause();
    }
    quitButtonClick() {
        PopupManager.instance.onHidePopupPause();
        PopupManager.instance.onShowQuitPopup();
    }

    restartButtonClick() {
        director.resume();
        PopupManager.instance.onHidePopupPause();
        RoomManager.instance.onRestart();
    }

    protected onDestroy() {
        this.resumeButton.node.off(Button.EventType.CLICK, this.resumeClick, this);
        this.quitButton.node.off(Button.EventType.CLICK, this.quitButtonClick, this);
        this.restartButton.node.off(Button.EventType.CLICK, this.restartButtonClick, this);
    }
}


