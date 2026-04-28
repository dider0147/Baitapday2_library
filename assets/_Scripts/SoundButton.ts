import { _decorator, AudioClip, Button, Component, Node } from 'cc';
import { AudioManager } from './AudioManager';
const { ccclass, requireComponent, property } = _decorator;

@ccclass('SoundButton')
@requireComponent(Button)
export class SoundButton extends Component {
    @property(AudioClip)
    private clickClip = null;

    private button: Button = null;

    protected onLoad() {
        this.button = this.getComponent(Button);
    }
    protected start() {
        this.button.node.on(Button.EventType.CLICK, this.soundClickButton, this);
    }
    private soundClickButton() {
        AudioManager.instance.playSFXSound(this.clickClip);
    }
}

