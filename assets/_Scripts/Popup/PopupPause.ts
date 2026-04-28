import { _decorator, Button, director } from 'cc';
import { UIBasePopup } from './UIBasePopup';
import { PopupManager } from './PopupManager';
import { QuitPopup } from './QuitPopup';
const { ccclass, property } = _decorator;

@ccclass('PopupPause')
export class PopupPause extends UIBasePopup {
    @property(Button)
    private quitButton = null;
    @property(Button)
    private resumeButton = null;

    protected onEnable(): void {
        this.resumeButton.node.on(Button.EventType.CLICK, this.resumeClick, this);
        this.quitButton.node.on(Button.EventType.CLICK, this.quitButtonClick, this);
    }
    resumeClick() {
        director.resume();
        PopupManager.instance.hide(PopupPause);
    }
    quitButtonClick() {
        PopupManager.instance.show(QuitPopup);
        PopupManager.instance.hide(PopupPause);
    }

    protected onDestroy() {
        this.resumeButton.node.off(Button.EventType.CLICK, this.resumeClick, this);
        this.quitButton.node.off(Button.EventType.CLICK, this.quitButtonClick, this);
    }
}


