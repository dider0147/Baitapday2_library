import { _decorator, Component, director } from 'cc';
import { GameData } from './GameData';
const { ccclass } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends Component {
    private nextScene = "";

    public static instance: SceneManager = null;

    protected onLoad() {
        SceneManager.instance = this;
    }

    public loadNextScene(scene: string) {
        this.nextScene = scene;

        director.loadScene(GameData.SCENE_LOADING);
    }

    public getNextScene = () => this.nextScene;
}

