import { _decorator, Button, Component, director, Label, Node } from 'cc';
import { UIBasePopup } from './UIBasePopup';
import { RoomManager } from './RoomManager';
import { PopupManager } from './PopupManager';
import { RoomState } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('UIPopupWin')
export class UIPopupWin extends UIBasePopup {
    @property(Button)
    private restartButton = null;
    @property(Button)
    private quitButton = null;
    @property(Label)
    private scoreLabel = null;

    protected onEnable() {
        this.restartButton.node.on(Button.EventType.CLICK, this.restartBttnClick, this);
        this.quitButton.node.on(Button.EventType.CLICK, this.quitBttnClick, this);
    }

    override show() {
        super.show();
        this.refreshUI();
    }

    private quitBttnClick() {
        director.resume();
        PopupManager.instance.hide(UIPopupWin);
        RoomManager.instance.setState(RoomState.end);
        console.log("popup " + RoomManager.instance.getState());
    }
    private restartBttnClick() {
        director.resume();
        PopupManager.instance.hide(UIPopupWin);
        RoomManager.instance.setState(RoomState.restart);
    }
    private refreshUI() {
        this.scoreLabel.string = RoomManager.instance.getScore().toString();
    }
}


