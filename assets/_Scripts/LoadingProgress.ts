import { _decorator, Component, director, Label, Node, ProgressBar } from 'cc';
import { SceneManager } from './SceneManager';
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
        const scene = SceneManager.instance.getNextScene();

        director.preloadScene(scene, (completedCount, totalCount) => {
            let progress = completedCount / totalCount;
            
            this.loadingBar.progress = progress;
            
            this.progressText.string = `Loading: ${Math.round(progress * 100)}%`;

        }, () => {
            director.loadScene(scene);
        });
    }
}

