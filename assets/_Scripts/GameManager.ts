import { _decorator, Component, director, Node } from 'cc';
import { GameData, GameState } from './GameData';
import { SceneManager } from './SceneManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private state: GameState = null;

    public static instance: GameManager = null;

    protected onLoad() {
        GameManager.instance = this;
    }

    protected start() {
        director.addPersistRootNode(this.node);
        this.setState(GameState.lobby);
    }

    public setState(state: GameState) {
        if (this.state && this.state == state) {
            return;
        }
        switch(state) {
            case GameState.lobby:
                SceneManager.instance.loadNextScene(GameData.SCENE_LOBBY);
                break;
            case GameState.room:
                SceneManager.instance.loadNextScene(GameData.SCENE_ROOM);
                break;
        }
        this.state = state;
    }



}

