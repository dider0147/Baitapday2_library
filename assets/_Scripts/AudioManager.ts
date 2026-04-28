import { _decorator, AudioClip, AudioSource, Component } from 'cc';
import { GameEventData } from './GameEventData';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    @property(AudioSource)
    private bgmSource = null;
    @property(AudioSource)
    private sfxSource = null;
    @property(AudioClip)
    private generalClip = null;

    public static instance: AudioManager = null;

    protected onLoad() {
        AudioManager.instance = this;
    }

    public toggleBGMAudio(mute: boolean) {
        this.bgmSource.volume = mute ? 0 : 1;
        console.log(this.bgmSource.volume);

        console.log(this.bgmSource.volume);
    }
    public toggleSFXAudio(mute: boolean) {
        this.sfxSource.volume = mute ? 0 : 1;
    }
    public playSFXSound(clip: AudioClip = null) {
        const audioClip = !clip ? this.generalClip : clip;
        this.sfxSource.playOneShot(audioClip, 1);
    }
}


