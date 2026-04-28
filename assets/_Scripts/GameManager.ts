import { _decorator, Component, Node } from 'cc';
import { GameState } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node)
    private lobby: Node = null;
    @property(Node)
    private room: Node = null;

    private state: GameState = null;

    public static instance: GameManager = null;

    protected onLoad() {
        GameManager.instance = this;
    }

    protected start() {
        this.setState(GameState.lobby);
    }

    public setState(state: GameState) {
        if (this.state && this.state == state) {
            return;
        }
        switch(state) {
            case GameState.lobby:
                this.lobby.active = true;
                this.room.active = false;
                console.log("bully 1");
                break;
            case GameState.room:
                this.lobby.active = false;
                this.room.active = true
                console.log("bully 1");
                break;
        }
        this.state = state;
    }



}

