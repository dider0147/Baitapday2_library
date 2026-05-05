import { _decorator, Component, director, Label, ProgressBar, Tween, tween } from 'cc';
import { SceneManager } from '../SceneManager';
import { GameData } from '../GameData';
const { ccclass, property } = _decorator;

@ccclass('LoadingProgress')
export class LoadingProgress extends Component {
    @property(ProgressBar)
    private loadingBar = null;
    @property(Label)
    private progressText = null;

    protected start() {
        this.loadingBar.progress = 0;
        this.progressLoading();
    }

    private progressLoading() {
        const scene = SceneManager.instance ? SceneManager.instance.getNextScene() : GameData.SCENE_LOBBY;

        director.preloadScene(scene, (completedCount, totalCount) => {
            let progress = completedCount / totalCount;

            Tween.stopAllByTarget(this.loadingBar);
            tween(this.loadingBar)
                .to(0.2, {progress: progress})
                .start();
            
            this.progressText.string = `Loading: ${Math.round(progress * 100)}%`;

        }, () => {
            this.scheduleOnce(() => {
                director.loadScene(scene);
            }, 1);
            
        });
    }
}

