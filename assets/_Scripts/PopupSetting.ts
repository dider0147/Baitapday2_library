import { _decorator, Button, director, Sprite, SpriteFrame } from 'cc';
import { UIBasePopup } from './UIBasePopup';
import { PopupManager } from './PopupManager';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('PopupSetting')
export class PopupSetting extends UIBasePopup {
    @property(Button)
    private muteBGM: Button = null;
    @property(Button)
    private muteSFX: Button = null;
    @property(Sprite)
    private bgmSprite: Sprite = null
    @property(Sprite)
    private sfxSprite: Sprite = null
    @property(SpriteFrame)
    private muteBGMSprite: SpriteFrame = null;
    @property(SpriteFrame)
    private unmuteBGMSprite: SpriteFrame = null;
    @property(SpriteFrame)
    private muteSFXSprite: SpriteFrame = null;
    @property(SpriteFrame)
    private unmuteSFXSprite: SpriteFrame = null;

    private isMuteBGM: boolean = false;
    private isMuteSFX: boolean = false;

    protected onEnable() {
        this.register();
    }
    private register() {
        this.muteBGM.node.on(Button.EventType.CLICK, this.onClickMuteBGM, this);
        this.muteSFX.node.on(Button.EventType.CLICK, this.onClickMuteSFX, this);
        this.exitButton.node.on(Button.EventType.CLICK, this.close, this);
    }

    private onClickMuteBGM() {
        this.isMuteBGM = !this.isMuteBGM;
        AudioManager.instance.toggleBGMAudio(this.isMuteBGM);
        this.bgmSprite.spriteFrame = this.isMuteBGM ? this.muteBGMSprite : this.unmuteBGMSprite;
    }
    private onClickMuteSFX() {
        this.isMuteSFX = !this.isMuteSFX;
        AudioManager.instance.toggleSFXAudio(this.isMuteSFX);
        this.sfxSprite.spriteFrame = this.isMuteSFX ? this.muteSFXSprite : this.unmuteSFXSprite;
    }
    private close() {
        director.resume();
        PopupManager.instance.hide(PopupSetting);
    }
    private unregister() {
        this.muteBGM.node.off(Button.EventType.CLICK, this.onClickMuteBGM, this);
        this.muteSFX.node.off(Button.EventType.CLICK, this.onClickMuteSFX, this);
        this.exitButton.node.off(Button.EventType.CLICK, this.close, this);
    }
    protected onDisable() {
        this.unregister();
    }
}

