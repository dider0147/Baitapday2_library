import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIScoreBoard')
export class UIScoreBoard extends Component {
    @property(Label)
    private scoreLabel = null;

    displayUIScore(score: number) {
        this.scoreLabel.string = score.toString();
    }
}


