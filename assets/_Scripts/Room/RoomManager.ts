import { _decorator, Component, director, UITransform } from 'cc';
import { RoomState } from '../GameData';
import { CharacterController } from './Character/CharacterController';
import { ClockTimer } from './ClockTimer';
import { GameEventData, GameState } from '../GameEventData';
import { PopupManager } from '../Popup/PopupManager';
import { GameManager } from '../GameManager';
import { UIScoreBoard } from '../Popup/UIScoreBoard';
const { ccclass, property } = _decorator;

@ccclass('RoomManager')
export class RoomManager extends Component {
    @property(UITransform)
    private canvas: UITransform = null;
    @property
    private gameplayTime = 60;
    @property(ClockTimer)
    private clockTimer = null;
    @property(UIScoreBoard)
    private scoreBoard = null;

    private currentState: RoomState = null;
    private currentScore: number = 0;

    public static instance: RoomManager = null;

    protected onLoad() {
        RoomManager.instance = this;
    }
    protected start() {
        this.onRestart();
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
                this.clockTimer.init(this.gameplayTime);    
                break;
            case RoomState.end:
                this.reset();
                GameManager.instance.setState(GameState.lobby);
                break;
            case RoomState.win:
                director.pause();
                PopupManager.instance.onShowPopupWin();
                break;
        }
        this.currentState = state;
        console.log("current state: " + this.currentState.toString());
    }
    public onRestart() {
        this.reset();
        this.setState(RoomState.ready);
    }
    public updateScore(score: number) {
        this.currentScore += score;
        this.scoreBoard.displayUIScore(this.currentScore);
    }
    private reset() {
        director.emit(GameEventData.ROOM_END);
        this.currentState = null;
        this.currentScore = 0;
        this.scoreBoard.displayUIScore(0);
        this.clockTimer.init(this.gameplayTime);
    }
    private pause() {
        PopupManager.instance.onShowPopupPause();
        director.pause();
    }
    private setting() {
        PopupManager.instance.onShowPopupSetting();
        director.pause();
    }

    public getState = () => this.currentState;
    public getScore = () => this.currentScore;
    public getCanvas = () => this.canvas;
    protected onDisable() {
        this.reset();
        RoomManager.instance = null;
    }
}

