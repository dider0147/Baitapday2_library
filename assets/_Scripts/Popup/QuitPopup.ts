import { _decorator, Button, director } from 'cc';
import { UIBasePopup } from './UIBasePopup';
import { RoomManager } from '../Room/RoomManager';
import { RoomState } from '../GameData';
import { PopupManager } from './PopupManager';
import { PopupPause } from './PopupPause';
const { ccclass, property } = _decorator;

@ccclass('QuitPopup')
export class QuitPopup extends UIBasePopup {
    @property(Button)
    private confirmButton = null;
    @property(Button)
    private cancelButton = null;

    protected onEnable(): void {
        this.confirmButton.node.on(Button.EventType.CLICK, this.confirmQuitButtonClick, this);
        this.cancelButton.node.on(Button.EventType.CLICK, this.cancelQuitButtonClick, this);
    }

    confirmQuitButtonClick() {
        director.resume();
        PopupManager.instance.hide(QuitPopup);
        RoomManager.instance.setState(RoomState.end);
    }
    cancelQuitButtonClick() {
        PopupManager.instance.show(PopupPause);
        PopupManager.instance.hide(QuitPopup);
    }

    protected onDestroy() {
        this.confirmButton.node.off(Button.EventType.CLICK, this.confirmQuitButtonClick, this);
        this.cancelButton.node.off(Button.EventType.CLICK, this.cancelQuitButtonClick, this);
    }
}


